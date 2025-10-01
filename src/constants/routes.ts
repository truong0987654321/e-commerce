const USER_BASE = "/u"
const SELLER_BASE = "/s"
const SELLER_DASHBOARD_BASE = "/s/dashboard"
export const ROUTES = {
    AUTH: {
        USER_SIGN_IN: `${USER_BASE}/sign-in`,
        USER_SIGN_UP: `${USER_BASE}/sign-up`,
        USER_PROFILE: `${USER_BASE}/profile`,
        USER_FORGOT_PASSWORD: `${USER_BASE}/forgot-password`,
        SELLER_SIGN_IN: `${SELLER_BASE}/sign-in`,
        SELLER_SIGN_UP: `${SELLER_BASE}/sign-up`,
        SELLER_PROFILE: `${SELLER_BASE}/profile`,
        SELLER_FORGOT_PASSWORD: `${SELLER_BASE}/forgot-password`
    },
    DASHBOARD: {
        SELLER_DASHBOARD: `${SELLER_DASHBOARD_BASE}`,
        SELLER_CREATE_PRODUCT: `${SELLER_DASHBOARD_BASE}/create-product`,
        SELLER_DISCOUNT_CODES: `${SELLER_DASHBOARD_BASE}/discount-codes`,
    }
};
