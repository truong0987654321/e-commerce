import { NextRequest } from "next/server";
import { BaseApi } from "@/app/api/base-api";
import { deleteDiscountCode } from "@/modules/product/product.controller";

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
    return BaseApi.handle(req, (r) => deleteDiscountCode(r, ctx.params));
}