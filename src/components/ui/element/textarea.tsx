
import { cn } from "@/lib/utils/cn";
import React, { useRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    maxLength?: number;
    showCounter?: boolean;
    height?: string | number;
}

export const Textarea = ({ className, label, value, onChange, placeholder, maxLength = 200, height = 60, showCounter = true, ...props }: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            const newHeight = Math.max(el.scrollHeight, Number(height));
            el.style.height = newHeight + "px";
        }
        onChange?.(e);
    };
    return (
        <div className="relative">
            {label && <h4 className="font-bold mb-4">{label}</h4>}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleInput}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{ minHeight: height }}
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm outline-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className ? className : ""
                )}
                {...props}
            />
            {showCounter && (
                <span className="absolute right-0 bottom-0 text-xs text-gray-500 mx-3 my-2 select-none">
                    {String(value ?? "").length}/{maxLength}
                </span>
            )}
        </div>
    )
}
