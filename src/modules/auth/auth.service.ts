import { ValidationError } from "@/lib/error-hanlder/app-error";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkOtpRestrictions, sendOtp, trackOtpRequests, verifyOtp } from "./auth.helper";

export const handleForgotPassword = async (req: NextRequest, userType: "user" | "seller") => {
    const body = await req.json();

    const { email } = body
    if (!email) throw new ValidationError("Email is required!")

    const user = userType === "user"
        && await prisma.users.findUnique({ where: { email } })

    if (!user) throw new ValidationError(`${userType} not found!`)

    await checkOtpRestrictions(email)
    await trackOtpRequests(email)
    await sendOtp(user.name, email, "forgot-password-user-mail")

    return NextResponse.json({
        status: 200,
        message: "OTP sent to email. Please verify your account.",
    })
}

export const verifyForgotPasswordOtp = async (req: NextRequest) => {
    const body = await req.json();
    const { email, otp } = body

    if (!email || !otp) throw new ValidationError("Email and OTP are required!")
    await verifyOtp(email, otp)

    return NextResponse.json({
        status: 200,
        message: "OTP verified. You can now reset your password.",
    })
}
