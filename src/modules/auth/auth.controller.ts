import { NextRequest, NextResponse } from "next/server";
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from "./auth.helper";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { AuthenticationError, ValidationError } from "@/lib/error-hanlder/app-error";
import { deleteCookie, setCookie } from "@/lib/utils/cookies/setCookies";
import { handleForgotPassword, verifyForgotPasswordOtp } from "@/modules/auth/auth.service";
import { isAuth } from "@/lib/middleware/is-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
})

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

    deleteCookie(res, "seller-access_token")
    deleteCookie(res, "seller-refresh_token")

    const accessToken = jwt.sign(
        { id: user.id, role: "user" },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "7d" }
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
        req.cookies.get("seller-refresh_token")?.value ||
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
        { expiresIn: "7d" }
    )
    const res = NextResponse.json(
        { success: true, },
        { status: 201, }
    )

    if (decoded.role === "user") {
        setCookie(res, "access_token", newAccessToken)
    } else if (decoded.role === "seller") {
        setCookie(res, "seller-access_token", newAccessToken)
    }

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

export const sellerRegister = async (req: NextRequest) => {
    const body = await req.json();
    validateRegistrationData(body, "seller");
    const { name, email } = body;
    const existingSeller = await prisma.sellers.findUnique({ where: { email }, })
    if (existingSeller) {
        throw new ValidationError("Seller already exists with this email!")
    }
    await checkOtpRestrictions(email)
    await trackOtpRequests(email)
    await sendOtp(name, email, "seller-activation")
    return NextResponse.json(
        { message: "OTP sent to email. Please verify your account.", },
        { status: 200, }
    );
}

export const sellerVerify = async (req: NextRequest) => {
    const body = await req.json();
    const { email, otp, password, name, phone_number, country } = body;

    if (!email || !otp || !password || !name || !phone_number || !country) {
        throw new ValidationError("All fields are required!");
    }
    const existingSeller = await prisma.sellers.findUnique({ where: { email } });
    if (existingSeller) {
        throw new ValidationError("Seller already exists with this email!");
    }
    await verifyOtp(email, otp);

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await prisma.sellers.create({
        data: {
            name,
            email,
            password: hashedPassword,
            country,
            phoneNumber: phone_number,
        },
    });

    return NextResponse.json(
        {
            message: "Seller registered successfully!",
            seller,
        },
        { status: 201, }
    );
}

export const createShop = async (req: NextRequest) => {
    const body = await req.json();
    const { name, bio, address, opening_hours, website, category, seller_id } = body
    if (!name || !bio || !address || !category || !opening_hours || !seller_id) {
        throw new ValidationError("All fields are required!")
    }
    const shopData: any = { name, bio, address, openingHours: opening_hours, category, sellerId: seller_id }

    if (website && website.trim() !== "") {
        shopData.website = website
    }
    const shop = await prisma.shops.create({
        data: shopData
    })

    return NextResponse.json(
        {
            success: true,
            shop,
        },
        { status: 201, }
    );
}

export const createStripeConnect = async (req: NextRequest) => {
    const body = await req.json();
    const { seller_id } = body;

    if (!seller_id) throw new ValidationError("Seller ID is required!");

    const seller = await prisma.sellers.findUnique({ where: { id: seller_id } });

    if (!seller) {
        throw new ValidationError("Seller is not available with this id!");
    }

    const account = await stripe.accounts.create({
        type: "express",
        email: seller.email,
        country: "GB",
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    });

    await prisma.sellers.update({
        where: { id: seller_id },
        data: { stripeId: account.id },
    });

    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.NEXT_PUBLIC_API_URL}/seller/success`,
        return_url: `${process.env.NEXT_PUBLIC_API_URL}/seller/success`,
        type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url }, { status: 200 });
};

export const sellerSignIn = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password } = body
    if (!email || !password) throw new ValidationError("Email and password are required!")

    const seller = await prisma.sellers.findUnique({ where: { email } })
    if (!seller) throw new ValidationError("Invalid email or password!")

    const isMatch = await bcrypt.compare(password, seller.password!)
    if (!isMatch) throw new ValidationError("Ivalid email or password!")

    const res = NextResponse.json(
        {
            message: "Login successful!",
            user: { id: seller.id, email: seller.email, name: seller.name }
        },
        { status: 200, }
    );

    deleteCookie(res, "access_token")
    deleteCookie(res, "refresh_token")

    const accessToken = jwt.sign(
        { id: seller.id, role: "seller" },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "7d" }
    )
    const refreshToken = jwt.sign(
        { id: seller.id, role: "seller" },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
    )

    setCookie(res, "seller-refresh_token", refreshToken)
    setCookie(res, "seller-access_token", accessToken)

    return res
}

export const getSeller = async (req: NextRequest) => {
    try {
        const { account, role } = await isAuth(req);
        if (role !== "seller") {
            throw new AuthenticationError("Access denied: Seller only")
        }

        return NextResponse.json(
            { success: true, seller: account },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 401 }
        );
    }
};
