import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export default apiClient;

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const handleLogout = () => {
    if (typeof window !== "undefined" && window.location.pathname !== ROUTES.AUTH.USER_SIGN_IN) {
        window.location.href = ROUTES.AUTH.USER_SIGN_IN;
    }
};

const subscribeTokenRefresh = (cb: () => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshedSuccess = () => {
    refreshSubscribers.forEach((cb) => cb());
    refreshSubscribers = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh(() =>
                        resolve(apiClient(originalRequest))
                    );
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, {});
                isRefreshing = false;
                onRefreshedSuccess();

                return apiClient(originalRequest);
            } catch (err) {
                isRefreshing = false;
                refreshSubscribers = [];
                handleLogout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
