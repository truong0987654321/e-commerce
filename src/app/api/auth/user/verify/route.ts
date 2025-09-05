import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { userVerify } from "@/modules/auth/auth.controller";

export async function POST(req: NextRequest) {
    return BaseApi.handle(req, userVerify);
}