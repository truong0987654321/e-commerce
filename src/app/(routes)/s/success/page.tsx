"use client"

import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(3); // đếm ngược từ 3 giây

    useEffect(() => {
        if (seconds <= 0) {
            router.push(ROUTES.AUTH.SELLER_SIGN_IN); // chuyển hướng sau khi hết thời gian
            return;
        }

        const timer = setTimeout(() => {
            setSeconds((prev) => prev - 1); // giảm mỗi 1 giây
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-semibold text-green-600">✅ Success!</h1>
            <p className="mt-2 text-gray-600">
                Redirecting to dashboard in <span className="font-bold">{seconds}</span> second
                {seconds !== 1 && "s"}...
            </p>
        </div>
    );
}