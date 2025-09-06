import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";

export const isAuth = async (req: NextRequest) => {
    try {
        const token =
            req.cookies.get("access_token")?.value ||
            req.cookies.get("seller-access_token")?.value ||
            req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            throw new Error("Unauthenticated! Token missing.");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
            id: string;
            role: "user" | "seller";
        };

        if (!decoded) {
            throw new Error("Unauthenticated! Invalid token.");
        }

        let account;
        if (decoded.role === "user") {
            account = await prisma.users.findUnique({ where: { id: decoded.id } });
        } else if (decoded.role === "seller") {
            account = await prisma.sellers.findUnique({ where: { id: decoded.id }, include: { shop: true } });
        }

        if (!account) {
            throw new Error("User not found!");
        }

        return { account, role: decoded.role };
    } catch (err) {
        if (err) {
            throw new Error("Unauthenticated! Token expired or invalid.");
        }
        throw err;
    }
};
