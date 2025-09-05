import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { getUser } from "@/modules/auth/auth.controller";

export async function GET(req: NextRequest) {
    return BaseApi.handle(req, getUser);
}