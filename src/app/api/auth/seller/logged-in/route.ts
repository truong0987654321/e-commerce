import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { getSeller } from "@/modules/auth/auth.controller";

export async function GET(req: NextRequest) {
    return BaseApi.handle(req, getSeller);
}