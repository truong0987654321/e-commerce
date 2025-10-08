"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp/input-otp";
import { useFormHandler } from "@/hooks/use-form-handler";
import { useAsyncHandler } from "@/hooks/use-async-handler";

export default function SignUpPage() {
    const router = useRouter();
    const { form, handleChange, resetForm } = useFormHandler({
        name: "",
        email: "",
        password: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("");
    const signUpHandler = useAsyncHandler();
    const resendOtpHandler = useAsyncHandler();
    const otpHandler = useAsyncHandler();

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
        if (!form.name || !form.email || !form.password || !confirmPassword) {
            return "All fields are required!";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            return "Invalid email format!";
        }
        if (form.password !== confirmPassword) {
            return "Passwords do not match!";
        }
        if (form.password.length < 6) {
            return "Password must be at least 6 characters"
        }

        return null;
    }


    const handleSignUp = () => {
        const validationError = validateForm();
        if (validationError) {
            setStatus("error")
            setIsShow(true)
            setError(validationError);
            return;
        }
        signUpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_REGISTER, { ...form }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setShowOtp(true)
                        setCanResend(false)
                        setTimer(60)
                        startResendTimer()
                        setError("")
                    }
                },
                onError: (message) => {
                    setStatus("error");
                    setIsShow(true);
                    setError(message);
                }
            }
        )
    }

    const handleOTPChange = (value: string) => {
        setOtp(value)
    };

    const handleResendOtp = () => {
        otpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_VERIFY, { ...form, otp }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setError("")
                        router.push(ROUTES.AUTH.USER_SIGN_IN);
                    }
                },
                onError: (message) => {
                    setStatus("error");
                    setIsShow(true);
                    setError(message);
                }
            }
        )
    };
    const resendOtp = async () => {
        if (!canResend) return; // chặn spam

        resendOtpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_REGISTER, { ...form, otp }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setCanResend(false);
                        setError("");
                        setIsShow(true);
                        setTimer(60);
                        startResendTimer();
                    }
                },
                onError: (message) => {
                    setStatus("error");
                    setIsShow(true);
                    setError(message);
                }
            }
        )
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
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text"
                                    label="User Name"
                                    placeholder="namlong"
                                />
                                <AuthInput
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    label="email"
                                    placeholder="namlong@gmail.com"
                                />
                                <AuthInput
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
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
                                    disabled={signUpHandler.isLoading}
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
                        description={`Check ${form.email} for the OTP to verify your account.`}
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
                            disabled={otpHandler.isLoading}
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