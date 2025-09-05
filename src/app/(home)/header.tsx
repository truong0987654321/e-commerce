"use client";

import { ROUTES } from "@/constants/routes";
import { useUser } from "@/hooks/useUser";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { HeaderBottom } from "./header-bottom";

const Header = () => {
    const { user, isLoading } = useUser()

    return (
        <div className="w-full bg-white">
            <div className="w-4/5 py-5 m-auto flex items-center justify-between">
                <div>
                    <Link href="/">
                        <span className="text-3xl font-medium">NamLong</span>
                    </Link>
                </div>
                <div className="w-1/2 relative">
                    <input
                        type="text"
                        placeholder="Search for product..."
                        className="w-full px-4 font-medium border-[0.156rem] border-[#3489ff] outline-none h-[3.438rem]" />
                    <div className="w-[3.75rem] cursor-pointer flex items-center justify-center h-[3.438rem] bg-[#3489ff] absolute top-0 right-0 ">
                        <Search className="text-white" />
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        {!isLoading && user ? (
                            <Link href={ROUTES.AUTH.USER_PROFILE}
                                className="flex items-center flex-wrap"
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
            </div >
            <div className="border-b border-b-[#99999938]" />
            <HeaderBottom />
        </div >
    );
}

export default Header;