import { AuthBody, AuthButton, AuthCard, AuthFeedback, AuthForm, AuthHeader, AuthInput } from "@/components/ui/authentication/auth";
import { API_ROUTES } from "@/constants/api-routes";
import { shopCategories } from "@/constants/categories";
import apiClient from "@/lib/api-client";

import { useState } from "react";
type Step = "create" | "setup" | "bank";
type CreateShopProps = {
    sellerId: string;
    setStep: (step: Step) => void;
}

export const CreateShop = ({ sellerId, setStep }: CreateShopProps) => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [address, setAddress] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [website, setWebsite] = useState("");
    const [category, setCategory] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"error" | "success" | "message">()
    const [isShow, setIsShow] = useState(false)
    const [error, setError] = useState("");

    const countWords = (str: string) => str.trim().split(/\s+/).length;

    const handleCreateShop = async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.post(API_ROUTES.AUTH.SELLER_CREATE_SHOP, { name, bio, address, opening_hours: openingHours, website, category, sellerId });
            if (response.status === 200 || response.status === 201) {
                setStep("bank");
                setError("")
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
                <AuthForm
                    onSubmit={handleCreateShop}
                >
                    <AuthInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        label="Shop Name"
                        placeholder="NamLong"
                    />
                    <AuthInput
                        value={bio}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (countWords(newValue) <= 100 || "Bio can't exceed 100 words") {
                                setBio(newValue);
                            }
                        }}
                        type="text"
                        label="Bio (Max 100 words)"
                        placeholder="Shop bio"
                    />
                    <AuthInput
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        label="Address *"
                        placeholder="Shop location"
                    />
                    <AuthInput
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        type="text"
                        label="Opening Hours"
                        placeholder="e.g., Mon-Fri 9AM - 6PM" // T2–T6: 9h–18h (Thứ Hai – Thứ Sáu, từ 9 giờ sáng đến 6 giờ chiều)
                    />
                    <AuthInput
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        type="text"
                        label="Website"
                        placeholder="https://namlong.com"
                    />
                    <div className="flex flex-col justify-between gap-4">
                        <label htmlFor="country" className="flex font-bold text-[0.8125rem] leading-3">
                            Category *
                        </label>
                        <div className="flex items-stretch justify-center relative flex-col flex-nowrap">
                            <select
                                id="category"
                                className="m-0 p-[.375rem_.75rem] max-h-[2.25rem] w-full font-normal text-[0.8125rem] rounded-[0.375rem] shadow-border-soft outline outline-transparent shadow-soft-strong-hv shadow-strong-fc"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}

                            >
                                <option value="" disabled>
                                    Select your category
                                </option>
                                {shopCategories.map((ct) => (
                                    <option
                                        className="bg-white text-gray-900 hover:bg-gray-100 checked:bg-[var(--primary-color)] checked:text-white"
                                        key={ct.value} value={ct.value}
                                    >
                                        {ct.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <AuthFeedback
                        show={isShow}
                        status={status}
                        text={error}
                    />
                    <AuthButton
                        disabled={isLoading}
                        loadingLabel="Creating..."
                        label="Create"
                    />
                </AuthForm>
            </AuthBody>
        </AuthCard>
    )
}
