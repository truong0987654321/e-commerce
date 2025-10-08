"use client"

import { useState, useCallback, useEffect } from "react";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants/api-routes";

export function useDiscount() {
    const [discounts, setDiscounts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchDiscounts = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await apiClient.get(API_ROUTES.PRODUCT.GET_DISCOUNT_CODE);
            setDiscounts(res.data.discountCodes ?? []);
        } catch (error) {
            setDiscounts([]);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDiscounts();
    }, [fetchDiscounts]);

    return {
        discounts,
        isLoading,
        isError,
        refetch: fetchDiscounts,
    };
}
