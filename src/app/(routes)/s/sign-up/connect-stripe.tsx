import { AuthBody, AuthButton, AuthCard, AuthFeedback, AuthHeader } from "@/components/ui/authentication/auth";
import { API_ROUTES } from "@/constants/api-routes";
import apiClient from "@/lib/api-client";
import { useState } from "react";

type ConnectStripeProps = {
    sellerId: string;
}

export const ConnectStripe = ({ sellerId }: ConnectStripeProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)
    const [error, setError] = useState("");
    const handleConnectStripe = async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.SELLER_CREATE_STRIPE, { sellerId })
            if (response.data.url) {
                setError("")
                window.location.href = response.data.url
            }
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Something went wrong! Please try again.";
            setStatus("error");
            setIsShow(true);
            setError(message);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <AuthCard>
            <AuthHeader
                title="Create Your Shop"
                description="Provide your shop details below"
            />
            <AuthBody>
                <AuthFeedback
                    show={isShow}
                    status={status}
                    text={error}
                />
                <AuthButton
                    onClick={handleConnectStripe}
                    disabled={isLoading}
                    loadingLabel="Connecting Stripe..."
                    label="Connect Stripe"
                />
            </AuthBody>
        </AuthCard>
    )
}
