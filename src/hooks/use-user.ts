import { API_ROUTES } from "@/constants/api-routes";
import apiClient from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await apiClient.get(API_ROUTES.AUTH.USER_LOGGED_IN);
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, isLoading, isError, refetch: fetchUser };
}