"use client";
import { createContext, useContext } from "react";

interface SellerContextType {
    seller: any | null;
    isLoading: boolean;
    isError?: boolean;
}

export const SellerContext = createContext<SellerContextType>({
    seller: null,
    isLoading: true,
    isError: false,
});

export const useSellerContext = () => useContext(SellerContext);
