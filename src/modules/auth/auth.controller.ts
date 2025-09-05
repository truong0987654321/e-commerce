import { NextRequest, NextResponse } from "next/server";
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from "./auth.helper";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { AuthenticationError, ValidationError } from "@/lib/error-hanlder/app-error";
import { setCookie } from "@/lib/utils/cookies/setCookies";
import { handleForgotPassword, verifyForgotPasswordOtp } from "@/modules/auth/auth.service";
import { isAuth } from "@/lib/middleware/is-auth";


export const userRegister = async (req: NextRequest) => {
    const body = await req.json();
    validateRegistrationData(body, "user");
    const { name, email } = body;

    const existingUser = await prisma.users.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ValidationError("User already exists with this email!")
    }

    await checkOtpRestrictions(email)
    await trackOtpRequests(email)
    await sendOtp(name, email, "user-activation-mail")

    return NextResponse.json(
        { message: "OTP sent to email. Please verify your account.", },
        { status: 200, }
    );
}

export const userVerify = async (req: NextRequest) => {
    const body = await req.json();
    const { email, otp, password, name } = body;

    if (!email || !otp || !password || !name) {
        throw new ValidationError("All fields are required!");
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
        throw new ValidationError("User already exists with this email!");
    }

    await verifyOtp(email, otp);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(
        {
            success: true,
            message: "User registered successfully!",
            user,
        },
        { status: 201, }
    );
};

export const userSignIn = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password } = body
    if (!email || !password) {
        throw new ValidationError("Email and password are required!")
    }

    const user = await prisma.users.findUnique({ where: { email } })

    if (!user) throw new AuthenticationError("User doesn't exists!")
    const isMatch = await bcrypt.compare(password, user.password!)
    if (!isMatch) {
        throw new AuthenticationError("Invalid email or password")
    }

    const res = NextResponse.json(
        {
            message: "Login successful!",
            user: { id: user.id, email: user.email, name: user.name }
        },
        { status: 200, }
    );

    const accessToken = jwt.sign(
        { id: user.id, role: "user" },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
        { id: user.id, role: "user" },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
    )

    setCookie(res, "refresh_token", refreshToken, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    setCookie(res, "access_token", accessToken, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    return res
}

export const refreshToken = async (req: NextRequest) => {
    const refreshToken =
        req.cookies.get("refresh_token")?.value ||
        req.headers.get("authorization")?.split(" ")[1];
    if (!refreshToken) {
        throw new AuthenticationError("Unauthenticated! No refresh token.")
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string, role: string }
    if (!decoded || !decoded.id || !decoded.role) {
        throw new JsonWebTokenError("Forbidden! Invalid refesh token.")
    }
    const account = await prisma.users.findUnique({ where: { id: decoded.id } });

    if (!account) {
        throw new AuthenticationError("Forbidden! User/Seller not found.")
    }

    const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
    )
    const res = NextResponse.json(
        { success: true, },
        { status: 201, }
    )

    setCookie(res, "access_token", newAccessToken)

    return res
}

export const userForgotPassword = async (req: NextRequest) => {
    return await handleForgotPassword(req, 'user')
}

export const userVerifyForgotPassword = async (req: NextRequest) => {
    return await verifyForgotPasswordOtp(req)
}

export const userResetPassword = async (req: NextRequest) => {
    const body = await req.json();
    const { email, new_password } = body
    if (!email || !new_password) {
        throw new ValidationError("Email an new password are required!")
    }
    const user = await prisma.users.findUnique({ where: { email } })
    if (!user) {
        throw new ValidationError("User not found!")
    }

    const isSamePassword = await bcrypt.compare(new_password, user.password!)

    if (isSamePassword) {
        throw new ValidationError("New password cannot be the same as the old password!")
    }

    const hashedPassword = await bcrypt.hash(new_password, 10)

    await prisma.users.update({
        where: { email },
        data: { password: hashedPassword }
    })
    return NextResponse.json(
        { message: "Password reset successfully!", },
        { status: 200, }
    )
}

export const getUser = async (req: NextRequest) => {
    try {
        const { account, role } = await isAuth(req);
        if (role !== "user") {
            throw new AuthenticationError("Access denied: User only")
        }

        return NextResponse.json(
            { success: true, user: account },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 401 }
        );
    }
}