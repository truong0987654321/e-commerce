import { cn } from "@/lib/utils/cn";
import React from "react";

interface TextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input = ({ className, label, placeholder, ...props }: TextareaProps) => {
    return (
        <>
            {label && <h4 className="font-bold mb-4">{label}</h4>}
            <input
                placeholder={placeholder}
                className={cn(
                    "block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none",
                    className ? className : ""
                )}
                {...props}
            >
            </input>
        </>
    )
}
