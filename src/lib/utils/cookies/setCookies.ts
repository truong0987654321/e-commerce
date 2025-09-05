import { NextResponse } from "next/server";

interface CookieOptions {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
}
export const setCookie = async (res: NextResponse, name: string, value: string, options?: CookieOptions) => {
    res.cookies.set({
        name,
        value,
        maxAge: options?.maxAge,
        httpOnly: options?.httpOnly ?? true,
        secure: options?.secure ?? process.env.NODE_ENV === "production",
        sameSite: options?.sameSite ?? "lax",
    });
}

export const deleteCookie = (res: NextResponse, name: string) => {
    res.cookies.set({
        name,
        value: "",
        maxAge: 0,
        path: "/",
    });
};