"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import "./tooltip.css"
import { cn } from "@/lib/utils/cn";
import { createPortal } from "react-dom";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    tooltip?: string;
    tooltipPosition?: TooltipPosition;
}

interface TooltipContextProps {
    showTooltip: boolean;
    setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
    tooltip?: string;
    tooltipPosition: TooltipPosition;
    divRef: React.RefObject<HTMLDivElement | null>;
}
interface TooltipTrigger extends TooltipProps { }

const TooltipContext = createContext<TooltipContextProps | null>(null);
export const useTooltip = () => {
    const ctx = useContext(TooltipContext);
    if (!ctx) throw new Error("useTooltip must be used within Tooltip");
    return ctx;
};
export const Tooltip = ({
    children,
    tooltip,
    tooltipPosition = "top",
    ...props
}: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    return (
        <TooltipContext.Provider
            value={{ showTooltip, setShowTooltip, tooltip, tooltipPosition, divRef }}
        >
            <div className="relative inline-flex"
                {...props}
            >{children}</div>

        </TooltipContext.Provider>
    );
};

export const TooltipTrigger = ({
    children,
    onClick,
    ...props
}: TooltipTrigger) => {
    const { setShowTooltip, divRef } = useTooltip();

    return (
        <div
            className="truncate w-auto"
            ref={divRef}
            onClick={onClick}
            onMouseEnter={() => {
                setShowTooltip(true);
            }}
            onMouseLeave={() => {
                setShowTooltip(false);
            }}
            {...props}
        >
            {children}
        </div>
    );
};
export const TooltipContent = ({ children, ...props }: TooltipProps) => {
    const { showTooltip, tooltip, tooltipPosition, divRef } = useTooltip();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getTooltipPositionStyle = () => {
        const rect = divRef.current?.getBoundingClientRect();

        if (!rect) return {};

        switch (tooltipPosition) {
            case "top":
                return {
                    top: rect.top - 8, // khoảng cách 8px
                    left: rect.left + rect.width / 2,
                    transform: "translate(-50%, -100%)",
                };
            case "bottom":
                return {
                    top: rect.bottom + 8,
                    left: rect.left + rect.width / 2,
                    transform: "translate(-50%, 0)",
                };
            case "left":
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left - 8,
                    transform: "translate(-100%, -50%)",
                };
            case "right":
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8,
                    transform: "translate(0, -50%)",
                };
        }
    };
    const getArrowClass = () => {
        switch (tooltipPosition) {
            case "top":
                return "after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:rotate-45";
            case "bottom":
                return "after:-top-1 after:left-1/2 after:-translate-x-1/2 after:rotate-45";
            case "left":
                return "after:-right-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45";
            case "right":
                return "after:-left-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45";
        }
    };
    if (!showTooltip || !mounted) return null;

    return createPortal(
        <div
            style={{
                position: "absolute",
                ...getTooltipPositionStyle(),
                zIndex: 9999,
            }}
            className={cn(
                "px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap transition-all duration-150",
                "after:content-[''] after:absolute after:w-2 after:h-2 after:bg-black",
                getArrowClass()
            )}
            {...props}
        >
            {children || tooltip}
        </div>,
        document.body
    );
};