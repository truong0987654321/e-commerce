"use client"

import { API_ROUTES } from "@/constants/api-routes";
import apiClient from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

export function useSeller() {
    const [seller, setSeller] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchSeller = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await apiClient.get(API_ROUTES.AUTH.SELLER_LOGGED_IN);
            setSeller(res.data.seller);
        } catch (error) {
            setSeller(null);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSeller();
    }, [fetchSeller]);

    return { seller, isLoading, isError, refetch: fetchSeller };
}