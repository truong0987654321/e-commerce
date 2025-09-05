import { PrismaClient } from "@/generated/prisma";

declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}

const prisma = new PrismaClient()

if (process.env.NODE_ENV === "production") global.prismadb = prisma

export default prisma
