"use client"

import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterForgotPassword, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.USER_SIGN_IN, { email, password })
            if (response.status === 200 || response.status === 201) {
                setError("")
                router.push("/")
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

    return (
        <AuthContainer>
            <AuthCard>
                <AuthHeader
                    title="Sign In"
                    description="Enter your credentials to access your account."
                />
                <AuthBody>

                    <AuthForm
                    // onSubmit={}
                    >
                        <AuthInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            label="Email"
                            placeholder="namlong@gmail.com"
                        />
                        <AuthInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label="Password"
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
                            onClick={handleSignIn}
                            loadingLabel="Activating..."
                            label="Sign In"
                        />
                    </AuthForm>
                </AuthBody>
            </AuthCard>
            <AuthFooter >
                <AuthFooterForgotPassword
                    text="Forgot Password"
                    linkHref={ROUTES.AUTH.USER_FORGOT_PASSWORD}
                />
                <AuthFooterTextWithLink
                    linkText="Sign Up"
                    linkHref={ROUTES.AUTH.USER_SIGN_UP}
                />
            </AuthFooter>
        </AuthContainer>
    )
}