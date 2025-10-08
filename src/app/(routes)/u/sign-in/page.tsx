"use client"

import { AuthBody, AuthButton, AuthCard, AuthContainer, AuthFeedback, AuthFooter, AuthFooterForgotPassword, AuthFooterTextWithLink, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import { useAsyncHandler } from "@/hooks/use-async-handler";
import { useFormHandler } from "@/hooks/use-form-handler";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();

    const { form, handleChange } = useFormHandler({
        email: "",
        password: "",
    })
    const signInHandler = useAsyncHandler();

    const [error, setError] = useState("");
    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)

    const handleSignIn = () => {
        signInHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.USER_SIGN_IN, { ...form }),
            {
                onSuccess: (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setError("")
                        router.push("/")
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
                    title="Sign In"
                    description="Enter your credentials to access your account."
                />
                <AuthBody>

                    <AuthForm
                    // onSubmit={}
                    >
                        <AuthInput
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="text"
                            label="Email"
                            placeholder="namlong@gmail.com"
                        />
                        <AuthInput
                            name="password"
                            value={form.password}
                            onChange={handleChange}
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
                            disabled={signInHandler.isLoading}
                            onClick={handleSignIn}
                            loadingLabel="Activating..."
                            label="Sign In"
                        />
                    </AuthForm>
                </AuthBody>
            </AuthCard>
            <AuthFooter>
                <AuthFooterForgotPassword
                    text="Forgot Password"
                    href={ROUTES.AUTH.USER_FORGOT_PASSWORD}
                />
                <AuthFooterTextWithLink
                    linkText="Sign Up"
                    href={ROUTES.AUTH.USER_SIGN_UP}
                />
            </AuthFooter>
        </AuthContainer>
    )
}