const AUTH_BASE = "/api/auth";
const USER_BASE = `${AUTH_BASE}/user`;

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
    },
};