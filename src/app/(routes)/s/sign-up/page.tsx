"use client"

import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp/input-otp";
import { StepCircle, StepLabel, StepProvider } from "@/components/ui/step/step";
import { API_ROUTES } from "@/constants/api-routes";
import { countries } from "@/constants/countries";
import apiClient from "@/lib/api-client";
import { useState } from "react";
import { CreateShop } from "./create-shop";
import { ConnectStripe } from "./connect-stripe";
import { useFormHandler } from "@/hooks/use-form-handler";
import { useAsyncHandler } from "@/hooks/use-async-handler";
// import { useRouter } from "next/navigation";

export default function SignUpPage() {
    // const router = useRouter();

    const steps = [
        { key: "create", label: "Create Account" },
        { key: "setup", label: "Setup Shop" },
        { key: "bank", label: "Connect Bank" },
    ];
    const [step, setStep] = useState<"create" | "setup" | "bank">("create");

    const { form, handleChange } = useFormHandler({
        name: "",
        email: "",
        password: "",
        phone: "",
        country: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("");

    const [sellerId, setSellerId] = useState("");

    const signUpHandler = useAsyncHandler();
    const otpHandler = useAsyncHandler();
    const resendOtpHandler = useAsyncHandler();

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
            () => apiClient.post(API_ROUTES.AUTH.SELLER_REGISTER, { ...form, phone_number: form.phone }),
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
            () => apiClient.post(API_ROUTES.AUTH.SELLER_VERIFY, { ...form, otp, phone_number: form.phone }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setError("")
                        setSellerId(response.data.seller.id)
                        setStep("setup")
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

    const resendOtp = () => {
        if (!canResend) return;
        resendOtpHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.SELLER_REGISTER, { ...form, otp, phone_number: form.phone }),
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
        <div className="min-h-[100vh]">
            <div className="p-4 shadow-2xl bg-white rounded-2xl h-[4.5rem] min-w-[25rem] sticky top-0 z-50">
                <StepProvider
                    steps={steps}
                    step={step}
                    className="w-3/4"
                >
                    <StepCircle className="w-6 h-6" />
                    <StepLabel className="whitespace-nowrap" />
                </StepProvider>
            </div>
            <AuthContainer>
                {step === "create" && (
                    <>
                        {!showOtp ? (
                            <>
                                <AuthCard>
                                    <AuthHeader
                                        title="Create Account"
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
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                type="number"
                                                label="Phone Number"
                                                placeholder="+8408123456"
                                            />
                                            <div className="flex flex-col justify-between gap-4">
                                                <label htmlFor="country" className="flex font-bold text-[0.8125rem] leading-3">
                                                    Country
                                                </label>
                                                <div className="flex items-stretch justify-center relative flex-col flex-nowrap">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        className="m-0 p-[.375rem_.75rem] max-h-[2.25rem] w-full font-normal text-[0.8125rem] rounded-[0.375rem] shadow-[var(--color-shadow-border-soft)] outline outline-transparent hover:shadow-[var(--color-shadow-soft-strong)] focus:shadow-[var(--color-shadow-strong)]"
                                                        value={form.country}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled>
                                                            Select your country
                                                        </option>
                                                        {countries.map((ct) => (
                                                            <option
                                                                className="bg-white text-gray-900 hover:bg-gray-100 checked:bg-[var(--primary-color)] checked:text-white"
                                                                key={ct.code} value={ct.code}
                                                            >
                                                                {ct.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

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
                                        text="Already have an account?"
                                        linkText="Sign In"
                                        href={API_ROUTES.AUTH.SELLER_SIGN_IN}
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
                    </>
                )}
                {step === "setup" && (<CreateShop sellerId={sellerId} setStep={setStep} />)}
                {step === "bank" && (<ConnectStripe sellerId={sellerId} />)}
            </AuthContainer>
        </div>
    )
}