import { AuthBody, AuthButton, AuthCard, AuthFeedback, AuthHeader } from "@/components/ui/authentication/auth";
import { API_ROUTES } from "@/constants/api-routes";
import { useAsyncHandler } from "@/hooks/use-async-handler";
import apiClient from "@/lib/api-client";
import { useState } from "react";

type ConnectStripeProps = {
    sellerId: string;
}

export const ConnectStripe = ({ sellerId }: ConnectStripeProps) => {

    const connectStripeHandler = useAsyncHandler();

    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)
    const [error, setError] = useState("");
    const handleConnectStripe = () => {
        connectStripeHandler.run(
            () => apiClient.post(API_ROUTES.AUTH.SELLER_CREATE_STRIPE, { sellerId }),
            {
                onSuccess: (response) => {
                    if (response.data.url) {
                        setError("")
                        window.location.href = response.data.url
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
                    disabled={connectStripeHandler.isLoading}
                    loadingLabel="Connecting Stripe..."
                    label="Connect Stripe"
                />
            </AuthBody>
        </AuthCard>
    )
}
