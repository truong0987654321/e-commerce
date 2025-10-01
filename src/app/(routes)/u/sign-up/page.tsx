"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp/input-otp";

export default function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)

    const startResendTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setCanResend(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            return "All fields are required!";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format!";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match!";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters"
        }

        return null;
    }


    const handleSignUp = async () => {
        setIsLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setStatus("error")
            setIsShow(true)
            setError(validationError);
            setIsLoading(false)
            return;
        }
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.USER_REGISTER, { name, email, password })
            if (response.status === 200 || response.status === 201) {
                setShowOtp(true)
                setCanResend(false)
                setTimer(60)
                startResendTimer()
                setError("")
            }
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Something went wrong! Please try again.";
            setStatus("error");
            setIsShow(true);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleOTPChange = (value: string) => {
        setOtp(value)
    };

    const handleResendOtp = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.USER_VERIFY, { email, otp, password, name })
            if (response.status === 200 || response.status === 201) {
                setError("")
                router.push(ROUTES.AUTH.USER_SIGN_IN);
            }
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Something went wrong! Please try again.";
            setStatus("error");
            setIsShow(true);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };
    const resendOtp = async () => {
        if (!canResend) return; // chặn spam
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.USER_REGISTER, { name, email, password })
            if (response.status === 200 || response.status === 201) {
                setCanResend(false);
                setError("");
                setIsShow(true);
                setTimer(60);
                startResendTimer();
            }
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Something went wrong! Please try again.";
            setStatus("error");
            setIsShow(true);
            setError(message);
        }
    }
    return (
        <AuthContainer>
            {!showOtp ? (
                <>
                    <AuthCard>
                        <AuthHeader
                            title="Sign Up"
                            description="Create your account to get started."
                        />
                        <AuthBody>

                            <AuthForm
                                onSubmit={handleSignUp}
                            >
                                <AuthInput
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    label="User Name"
                                    placeholder="namlong"
                                />
                                <AuthInput
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    label="email"
                                    placeholder="namlong@gmail.com"
                                />
                                <AuthInput
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    label="Password"
                                    placeholder="********"
                                />
                                <AuthInput
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    label="Confirm password"
                                    placeholder="********"
                                >
                                    <AuthFeedback
                                        show={isShow}
                                        status={status}
                                        text={error}
                                    />
                                </AuthInput>

                                <AuthButton
                                    disabled={isLoading}
                                    loadingLabel="Signing up..."
                                    label="Sign Up"
                                />
                            </AuthForm>
                        </AuthBody>
                    </AuthCard>
                    <AuthFooter>
                        <AuthFooterTextWithLink
                            linkText="Sign In"
                            href={ROUTES.AUTH.USER_SIGN_IN}
                            text="Already have an account?"
                        />
                    </AuthFooter>
                </>
            ) : (
                <AuthCard>
                    <AuthHeader
                        title="End Your OTP"
                        description={`Check ${email} for the OTP to verify your account.`}
                    />
                    <AuthBody>
                        <InputOTP
                            onChange={handleOTPChange}
                            className="justify-center"
                            maxLength={6}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                        </InputOTP>
                        <AuthFeedback
                            show={isShow}
                            status={status}
                            text={error}
                        />

                        <AuthButton
                            onClick={handleResendOtp}
                            disabled={isLoading}
                            loadingLabel="Verifying..."
                            label="Verify OTP"
                        />
                    </AuthBody>
                    <p className="text-center text-sm mt-2">
                        {canResend ? (
                            <button
                                onClick={resendOtp}
                                className="text-blue-500 cursor-pointer"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            `Resend OTP in ${timer}s`
                        )}
                    </p>
                </AuthCard>
            )}

        </AuthContainer>
    )
}