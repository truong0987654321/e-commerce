"use client";

import { SellerContext } from "@/contexts/seller-context";
import { useSeller } from "@/hooks/use-seller";

export function SellerProvider({ children }: { children: React.ReactNode }) {
    const { seller, isLoading, isError } = useSeller();

    return (
        <SellerContext.Provider value={{ seller, isLoading, isError }}>
            {children}
        </SellerContext.Provider>
    );
}