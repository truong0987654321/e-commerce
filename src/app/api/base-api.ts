import { NextRequest, NextResponse } from "next/server";
import { ErrorMiddleware } from "@/lib/error-hanlder/error-middleware";

export class BaseApi {
    static async handle(req: NextRequest, handler: (req: NextRequest) => Promise<NextResponse>) {
        try {
            return await handler(req);
        } catch (error: any) {
            // return ErrorMiddleware(error);
            console.error("API Error:", error);

            return NextResponse.json(
                { message: error?.message || "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}