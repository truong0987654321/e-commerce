"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants/api-routes";
import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp/input-otp";
import { ROUTES } from "@/constants/routes";
import { StepCircle, StepLabel, StepProvider } from "@/components/ui/step/step";
import { useAsyncHandler } from "@/hooks/use-async-handler";
import { useFormHandler } from "@/hooks/use-form-handler";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const steps = [
        { key: "email", label: "Enter Account" },
        { key: "otp", label: "Security Verification" },
        { key: "reset", label: "Set Password" },
    ];
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");

    const { form, handleChange, resetForm } = useFormHandler({
        email: "",
        password: "",
    })

    const forgotPasswordHandler = useAsyncHandler();
    const verifyOtpHandler = useAsyncHandler();
    const resetPasswordHandler = useAsyncHandler();
    const resendOtpHandler = useAsyncHandler();

    const [otp, setOtp] = useState("");
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState("");
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

    const handleForgotPassword = async () => {
        forgotPasswordHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_FORGOT_PASSWORD, { email: form.email }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setStep("otp")
                        setCanResend(false)
                        setError("")
                        startResendTimer()
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

    const handleVerifyOtp = async () => {
        verifyOtpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_VERIFY_FORGOT_PASSWORD, { email: form.email, otp }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setStep("reset")
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
    const validateForm = () => {
        if (form.password.length < 6) {
            return "Password must be at least 6 characters"
        }

        return null;
    }

    const handleResetPassword = async () => {
        const validationError = validateForm();
        if (validationError) {
            setStatus("error")
            setIsShow(true)
            setError(validationError);
            return;
        }
        resetPasswordHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_RESET_PASSWORD, { email: form.email, new_password: form.password }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setError("")
                        router.push(ROUTES.AUTH.USER_SIGN_IN)
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
    const resendOtp = async () => {
        if (!canResend) return
        resendOtpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_VERIFY_FORGOT_PASSWORD, { email: form.email, otp }),
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
            <AuthCard>
                <AuthHeader
                    title="Forgot Password?"
                />
                <StepProvider
                    steps={steps}
                    step={step}
                    className="w-4/5"
                >
                    <StepCircle />
                    <StepLabel />
                </StepProvider>
                {step === "email" && (
                    <AuthBody>
                        <AuthForm
                            onSubmit={handleForgotPassword}
                        >
                            <AuthInput
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="text"
                                label="Email"
                                placeholder="namlong@gmail.com"
                            >
                                <AuthFeedback
                                    show={isShow}
                                    status={status}
                                    text={error}
                                />
                            </AuthInput>
                            <AuthButton
                                disabled={forgotPasswordHandler.isLoading}
                                loadingLabel="Sending OTP..."
                                label="Submit"
                            />
                        </AuthForm>
                    </AuthBody>
                )}
                {step === "otp" && (
                    <React.Fragment>
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
                                onClick={handleVerifyOtp}
                                disabled={verifyOtpHandler.isLoading}
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
                    </React.Fragment>
                )}
                {step === "reset" && (
                    <AuthBody>
                        <AuthForm
                            onSubmit={handleResetPassword}
                        >
                            <AuthInput
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                label="New Password"
                                placeholder="******"
                            >
                                <AuthFeedback
                                    show={isShow}
                                    status={status}
                                    text={error}
                                />
                            </AuthInput>
                            <AuthButton
                                disabled={resetPasswordHandler.isLoading}
                                loadingLabel="Resetting..."
                                label="Reset Password"
                            />
                        </AuthForm>
                    </AuthBody>
                )}
            </AuthCard>
            {step === "email" && (
                <AuthFooter >
                    <AuthFooterTextWithLink
                        linkText="Sign In"
                        href={ROUTES.AUTH.USER_SIGN_IN}
                        text="Go back to?"
                    />
                </AuthFooter>

            )}
        </AuthContainer>
    )
}
