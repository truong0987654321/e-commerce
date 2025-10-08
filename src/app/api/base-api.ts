import { NextRequest, NextResponse } from "next/server";

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