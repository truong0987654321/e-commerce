import { AuthenticationError, NotFoundError, ValidationError } from "@/lib/error-hanlder/app-error";
import { isAuth } from "@/lib/middleware/is-auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const getCategories = async () => {
    const config = await prisma.siteConfig.findFirst()

    if (!config) {
        return NextResponse.json(
            { message: "Categories not found" },
            { status: 404, }
        )
    }
    return NextResponse.json(
        {
            categories: config.categories,
            subCategories: config.subCategories,
        },
        { status: 200 }
    )
}

export const createDiscountCodes = async (req: NextRequest) => {
    const body = await req.json();
    const { publicName, discountType, discountValue, discountCode, sellerId } = body
    const isDiscountCodeExist = await prisma.discountCodes.findUnique({
        where: {
            discountCode
        }
    })
    if (isDiscountCodeExist) {
        throw new ValidationError("Discount code already available plesae use a different code!")
    }
    const discountCodes = await prisma.discountCodes.create({
        data: {
            publicName,
            discountType,
            discountValue: parseFloat(discountValue),
            discountCode,
            sellerId
        }
    })
    return NextResponse.json(
        {
            success: true,
            discountCodes
        },
        { status: 201 }
    )
}

export const getDiscountCodes = async (req: NextRequest) => {
    const { account, role } = await isAuth(req);

    if (role !== "seller") {
        throw new AuthenticationError("Access denied: Seller only");
    }


    const discountCodes = await prisma.discountCodes.findMany({
        where: {
            sellerId: account.id
        }
    })
    return NextResponse.json(
        {
            success: true,
            discountCodes,
        },
        { status: 201 }
    )
}
export const deleteDiscountCode = async (req: NextRequest, params: { id: string }) => {
    const { account, role } = await isAuth(req);

    if (role !== "seller") {
        throw new AuthenticationError("Access denied: Seller only");
    }
    const id = params.id; // ✅ lấy id từ params
    const sellerId = account.id;

    if (!id) {
        throw new ValidationError("Discount code id is required!");
    }

    const discountCodes = await prisma.discountCodes.findUnique({
        where: { id }, // ✅ lúc này id chắc chắn là string
        select: { id: true, sellerId: true },
    });
    if (!discountCodes) {
        throw new NotFoundError("Disccount code not found!")
    }
    if (discountCodes.sellerId !== sellerId) {
        throw new ValidationError("Unauthorized access!")
    }
    await prisma.discountCodes.delete({ where: { id } })
    return NextResponse.json(
        { message: "Discount code successfully deleted" },
        { status: 200 }
    )
}