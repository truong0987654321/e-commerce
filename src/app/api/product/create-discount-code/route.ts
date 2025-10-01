import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { createDiscountCodes } from "@/modules/product/product.controller";

export async function POST(req: NextRequest) {
    return BaseApi.handle(req, createDiscountCodes);
}