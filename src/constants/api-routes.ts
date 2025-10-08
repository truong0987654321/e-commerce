const AUTH_BASE = "/api/auth";
const USER_BASE = `${AUTH_BASE}/user`;
const SELLER_BASE = `${AUTH_BASE}/seller`;
const PRODUCT_BASE = "api/product"

export const API_ROUTES = {
    AUTH: {
        REFRESH_TOKEN: `${AUTH_BASE}/refresh-token`,
        USER_REGISTER: `${USER_BASE}/register`,
        USER_VERIFY: `${USER_BASE}/verify`,
        USER_SIGN_IN: `${USER_BASE}/sign-in`,
        USER_LOGGED_IN: `${USER_BASE}/logged-in`,
        USER_FORGOT_PASSWORD: `${USER_BASE}/forgot-password`,
        USER_VERIFY_FORGOT_PASSWORD: `${USER_BASE}/verify-forgot-password`,
        USER_RESET_PASSWORD: `${USER_BASE}/reset-password`,
        SELLER_REGISTER: `${SELLER_BASE}/register`,
        SELLER_VERIFY: `${SELLER_BASE}/verify`,
        SELLER_SIGN_IN: `${SELLER_BASE}/sign-in`,
        SELLER_LOGGED_IN: `${SELLER_BASE}/logged-in`,
        SELLER_CREATE_SHOP: `${SELLER_BASE}/create-shop`,
        SELLER_CREATE_STRIPE: `${SELLER_BASE}/create-stripe`,
    },
    INIT: "/api/init",
    PRODUCT: {
        GET_CATEGORIES: `${PRODUCT_BASE}/get-categories`,
        CREATE_DISCOUNT_CODE: `${PRODUCT_BASE}/create-discount-code`,
        GET_DISCOUNT_CODE: `${PRODUCT_BASE}/get-discount-codes`,
        DELETE_DISCOUNT_CODE: `${PRODUCT_BASE}/delete-discount-codes`,
    }
};
