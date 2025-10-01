"use server";

import { cookies } from "next/headers";

export async function setSidebarCookie(key: string, value: boolean) {
    (await cookies()).set(key, String(value));
}
export async function clearSidebarCookie(key: string,) {
    (await cookies()).delete(key);
}