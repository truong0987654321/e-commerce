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
// import { useRouter } from "next/navigation";

export default function SignUpPage() {
    // const router = useRouter();

    const steps = [
        { key: "create", label: "Create Account" },
        { key: "setup", label: "Setup Shop" },
        { key: "bank", label: "Connect Bank" },
    ];
    const [step, setStep] = useState<"create" | "setup" | "bank">("create");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [sellerId, setSellerId] = useState("");

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
            const response = await apiClient.post(API_ROUTES.AUTH.SELLER_REGISTER, { name, email, password, phone_number: phone, country })
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
            const response = await apiClient.post(API_ROUTES.AUTH.SELLER_VERIFY, { email, otp, password, name, phone_number: phone, country })
            if (response.status === 200 || response.status === 201) {
                setError("")
                setSellerId(response.data.seller.id)
                setStep("setup")
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
            const response = await apiClient.post(API_ROUTES.AUTH.SELLER_REGISTER, { name, email, password, phone_number: phone, country })
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
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
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
                                                        className="m-0 p-[.375rem_.75rem] max-h-[2.25rem] w-full font-normal text-[0.8125rem] rounded-[0.375rem] shadow-[var(--color-shadow-border-soft)] outline outline-transparent hover:shadow-[var(--color-shadow-soft-strong)] focus:shadow-[var(--color-shadow-strong)]"
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}

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
                    </>
                )}
                {step === "setup" && (<CreateShop sellerId={sellerId} setStep={setStep} />)}
                {step === "bank" && (<ConnectStripe sellerId={sellerId} />)}
            </AuthContainer>
        </div>
    )
}