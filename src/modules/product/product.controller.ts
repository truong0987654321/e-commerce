import { AuthenticationError, NotFoundError, ValidationError } from "@/lib/error-hanlder/app-error";
import { isAuth } from "@/lib/middleware/is-auth";
import { prisma } from "@/lib/prisma";
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
export const deleteDiscountCodes = async (req: NextRequest) => {
    const { account, role } = await isAuth(req);
    console.log("Auth info:", account, role);
    if (role !== "seller") {
        throw new AuthenticationError("Access denied: Seller only");
    }

    const body = await req.json();
    const ids: string[] = body.ids;
    const sellerId = account.id;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ValidationError("Discount code ids are required!");
    }

    const discountCodes = await prisma.discountCodes.findMany({
        where: { id: { in: ids }, sellerId },
        select: { id: true },
    });

    if (discountCodes.length === 0) {
        throw new NotFoundError("No discount codes found for deletion!");
    }

    const foundIds = discountCodes.map(dc => dc.id);

    await prisma.discountCodes.deleteMany({ where: { id: { in: foundIds } } });

    return NextResponse.json({
        message: "Discount codes successfully deleted",
        deletedIds: foundIds,
    }, { status: 200 });
};