import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { getCategories } from "@/modules/product/product.controller";

export async function GET(req: NextRequest) {
    return BaseApi.handle(req, getCategories);
}