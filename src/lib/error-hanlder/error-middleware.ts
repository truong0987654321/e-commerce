
import { AppError } from "./app-error"
import { NextResponse } from "next/server"

export const ErrorMiddleware = (err: any) => {
    if (err instanceof AppError) {
        return NextResponse.json(
            {
                status: "error",
                message: err.message,
                ...(err.details && { details: err.details }),
            },
            { status: err.statusCode }
        );
    }
    return NextResponse.json(
        { status: "error", message: "Something went wrong!" },
        { status: 500 }
    );
}