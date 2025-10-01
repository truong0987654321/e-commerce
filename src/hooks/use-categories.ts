import { API_ROUTES } from "@/constants/api-routes";
import apiClient from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

export function useCategories() {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState<Error | null>(null)

    const fetchCategories = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.get(API_ROUTES.PRODUCT.GET_CATEGORIES)
            setData(response.data)
        } catch (error: any) {
            console.error("Error fetching categories:", error)
            setIsError(error)
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { data, isLoading, isError, refetch: fetchCategories };
}