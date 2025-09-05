"use client";

import { navItems } from "@/constants/nav-items";
import { ROUTES } from "@/constants/routes";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils/cn";
import { AlignLeft, ChevronDown, Heart, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeaderBottom = () => {
    const [show, setShow] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { user, isLoading } = useUser()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);
    return (
        <div className={cn(
            "w-full transition-all duration-300",
            isSticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"
        )}>
            <div className={cn(
                "w-4/5 relative m-auto flex items-center justify-between",
                isSticky ? "py-3" : "py-0"
            )}>
                <div
                    className={cn(
                        "w-[16.25rem] cursor-pointer flex items-center justify-between px-5 h-[3.125rem] bg-[var(--bg-color)]",
                        isSticky && "-mb-2"
                    )}
                    onClick={() => setShow(!show)}
                >
                    <div className="flex items-center gap-2">
                        <AlignLeft color="white" />
                        <span className="text-white font-medium">All Departments</span>
                    </div>
                    <ChevronDown color="white" />
                </div>
                {show && (
                    <div className={cn(
                        "absolute left-0 w-[16.25rem] h-[25rem] bg-[#f5f5f5]",
                        isSticky ? "top-[4.375rem]" : "top-[3.125rem]"
                    )}></div>
                )}
                <div className="flex items-center">
                    {navItems.map((i, index) => (
                        <Link
                            className="px-5 font-medium text-lg"
                            href={i.href}
                            key={index}
                        >
                            {i.title}
                        </Link>
                    ))}
                </div>
                <div >
                    {isSticky && (
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                {!isLoading && user ? (
                                    <Link href={ROUTES.AUTH.USER_PROFILE}
                                        className="flex items-center"
                                    >
                                        <div
                                            className="border-2 size-[3.125rem] flex items-center justify-center rounded-full border-[#010f1c1a]"
                                        >
                                            <UserRound className="w-5 h-[1.438rem]" />
                                        </div>
                                        <div className="flex flex-col ml-2">
                                            <span className="block font-medium">Hello,</span>
                                            <span className="font-medium">{user.name?.split(" ")[0]}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={ROUTES.AUTH.USER_SIGN_IN}
                                        className="flex items-center flex-wrap"
                                    >
                                        <div
                                            className="border-2 size-[3.125rem] flex items-center justify-center rounded-full border-[#010f1c1a]"
                                        >
                                            <UserRound className="w-5 h-[1.438rem]" />
                                        </div>
                                        <div className="flex flex-col ml-2">
                                            <span className="block font-medium">Hello,</span>
                                            <span className="font-medium">
                                                {isLoading ? "..." : "Sign In"}
                                            </span>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center gap-5">
                                <Link href="/wishlist" className="relative">
                                    <Heart className="w-[1.563rem] h-[1.375rem]" />
                                    <div className="size-5 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2.5 -right-2.5">
                                        <span className="text-white font-medium text-[.75rem]">0</span>
                                    </div>
                                </Link>
                                <Link href="/wishlist" className="relative">
                                    <ShoppingCart className="w-[1.563rem] h-[1.375rem]" />
                                    <div className="size-5 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2.5 -right-2.5">
                                        <span className="text-white font-medium text-[.75rem]">0</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
