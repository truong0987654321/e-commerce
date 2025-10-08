"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import "./sidebar.css"
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { setSidebarCookie } from "./sidebar.actions";

export const SIDEBAR_COOKIE_KEY = "sidebar-collapsed" as const;

type SidebarButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?: boolean;
    setCollapsed?: (open: boolean) => void;
    isSmallScreen?: boolean;
    setIsSmallScreen?: (val: boolean) => void;
    label?: string;
    title?: string;
}

interface SidebarAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    exact?: boolean;
    tooltip?: string;
    tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const SidebarContext = createContext<SidebarProps | undefined>(undefined);

const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useDropdownMenu must be used within DropdownMenu");
    return context;
};

export const SidebarProvider = ({ collapsed, children }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed ?? false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 919) {
                setIsCollapsed(true);
                setIsSmallScreen(false);
            } else {
                setIsSmallScreen(false);
                const shouldCollapse = width < 1313;
                setIsCollapsed(shouldCollapse);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <SidebarContext.Provider value={{ collapsed: isCollapsed, setCollapsed: setIsCollapsed, isSmallScreen, setIsSmallScreen }}>
            <div className="home">{children}</div>
        </SidebarContext.Provider>
    );
};

export const SidebarTrigger = ({ children, className, ...props }: SidebarProps) => {
    const { collapsed, setCollapsed, setIsSmallScreen } = useSidebar();
    const handleClick = async () => {
        const width = window.innerWidth;

        if (width < 919) {
            setIsSmallScreen?.(true);
            setCollapsed?.(false)
        } else {
            setIsSmallScreen?.(false);

            const newState = !collapsed;
            setCollapsed?.(newState);
            await setSidebarCookie(SIDEBAR_COOKIE_KEY, newState);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={cn(
                "sidebar-trigger",
                className ?? className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarMain = ({ children, ...props }: SidebarProps) => {
    return (
        <main className="main bg-[var(--color-sidebar-bg-1)] min-w-0 relative overflow-auto max-h-[100vh] p-[0_1.5rem]"
            {...props}
        >
            {children}
        </main>
    )
}

/**
 * SidebarHeader
 */

export const SidebarHeader = ({ children, className, ...props }: SidebarProps) => {
    return (
        <div className="header grid sticky top-0">
            <div className={cn(
                "flex flex-row flex-wrap relative p-[0_0_0_1.5rem] m-[0_0_1.5rem] text-[var(--color-sidebar-header-text)] bg-[var(--color-sidebar-header-bg)]",
                className ? className : "h-12"
            )}
                {...props}
            >
                {children}
            </div>
        </div>
    )
}

export const SidebarHeaderMessage = ({ children, ...props }: SidebarProps) => {
    return (
        <div
            className="mr-6 py pr-0 text-[.875rem]/5 whitespace-nowrap flex flex-wrap items-center"
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarHeaderIcon = ({ children, ...props }: SidebarProps) => {
    return (
        <span
            className="flex items-center justify-center top-[.688rem] mr-3 text-2xl w-6 h-6"
            {...props}
        >
            {children}
        </span>
    )
}

export const SidebarHeaderText = ({ children, ...props }: SidebarProps) => {
    return (
        <div
            className="font-medium inline-block align-middle text-center"
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarHeaderButton = ({ children, onClick }: SidebarButtonTypes) => {
    return (
        <div className="flex flex-[1_1_auto] flex-row justify-end">
            <div className="flex flex-row items-center justify-end pr-2">
                <button className="inline-flex items-center justify-center select-none relative group rounded-[.5rem] py-0 px-4 h-9 cursor-pointer" onClick={onClick}>
                    <span className="inset-0 absolute pointer-events-none rounded-[inherit] group-hover:before:opacity-[.2] group-hover:before:bg-[var(--color-sidebar-ink-2)] group-hover:before:inset-0 group-hover:before:absolute group-hover:before:rounded-[inherit]"></span>
                    <span className="z-1 relative"> {children} </span>
                </button>
            </div>
        </div>
    )
}
/**
 * end SidebarHeader
 */

/**
 * SidebarActivityBar
 */

export const SidebarActivityBar = ({ children }: SidebarProps) => {
    return (
        <div className="activity-bar relative border-l border-[var(--color-sidebar-border-line)]">
            <div className="h-full flex fixed right-0">
                <div className="border-[rgba(0,0,0,0)] bg-[var(--color-sidebar-bg-2)] box-border flex flex-grow-[1] w-14 z-[61] rounded-none p-1 m-0 transition-[width_.3s_cubic-bezier(.3,0,.8,.15)]">
                    <div className="flex flex-col items-center justify-between gap-4 pt-2 w-12">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}

export const SidebarActivityBarTopContent = ({ children, ...props }: SidebarProps) => {
    return (
        <div
            className="flex flex-col items-center gap-4"
            {...props}
        >
            {children}
        </div>
    )
}
/**
 * end SidebarActivityBar
 */

export const Sidebar = ({ children, ...props }: SidebarProps) => {
    const { isSmallScreen, setIsSmallScreen, setCollapsed } = useSidebar();
    const handleOverlayClick = () => {
        setIsSmallScreen?.(false);
        setCollapsed?.(true)
    }
    return (
        <div
            className="sidebar h-[100vh] sticky z-[12] top-0 shadow-[1px_0_var(--color-sidebar-border-line)]"
            {...props}
        >
            {isSmallScreen && (
                <div
                    onClick={handleOverlayClick}
                    className="block bg-[#0006] h-[100vh] fixed w-full" />
            )}
            {children}
        </div>
    )
}

export const SidebarContainer = ({ children, className, ...props }: SidebarProps) => {
    const { collapsed, isSmallScreen } = useSidebar();
    return (
        <div
            className={cn(
                "sidebar-container bg-[var(--color-sidebar-bg-1)] flex flex-col h-[100vh] transition-[width_.3s_cubic-bezier(0.4,0,0.2,1)]",
                isSmallScreen
                    ? "w-64" // 📌 small screen luôn w-64
                    : collapsed
                        ? "w-[4.25rem] is-collapsed" // 📌 chỉ desktop mới có is-collapsed
                        : "w-64",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarLogo = ({ children, href, className }: SidebarAProps) => {
    const { collapsed } = useSidebar();
    return (
        <h2>
            <a href={href ?? "/"} target="_blank">
                <div
                    className={cn(
                        "flex items-center border-b border-solid border-[var(--color-sidebar-border-line)]",
                        collapsed ? "justify-center" : "",
                        className ? className : "py-0 px-5 h-12"
                    )}
                >
                    {children}
                </div>
            </a>
        </h2>
    )
}

export const SidebarLogoIcon = ({ children, className, ...props }: SidebarProps) => {
    return (
        <span
            className={cn(
                "icon relative",
                className ? className : "text-[1.4rem] w-7 h-7"
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export const SidebarLogoText = ({ children, className, ...props }: SidebarProps) => {
    const { collapsed } = useSidebar()
    if (collapsed) return null
    return (
        <span
            className={cn(
                className ? className : "font-bold text-[1.5rem] text-[var(--color-sidebar-logo-text)] ml-3",
                "transition-[opacity_.3s_cubic-bezier(.4,0,.2,1)]"
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export const SidebarItemContainer = ({ children }: SidebarProps) => {
    const { collapsed } = useSidebar()
    return (
        <div className={cn(
            "flex flex-col flex-grow-[1] justify-between overflow-x-hidden overflow-y-auto overscroll-none",
            collapsed ? "sidebar-container-item-0" : "sidebar-container-item"
        )}
        >
            <div
                className={cn(
                    collapsed ? "" : "py-0 px-1"
                )}
            >
                {children}
            </div>
        </div>
    )
}

export const SidebarItem = ({
    children,
    href,
    exact = false,
    tooltip,
    tooltipPosition = "right",
    ...props
}: SidebarAProps) => {
    const pathname = usePathname();
    const isActive = exact
        ? pathname === href
        : pathname === href;

    const { collapsed } = useSidebar();

    const item = (
        <div className="w-auto my-3 rounded-2xl block relative">
            <Link
                href={href ?? "/"}
                className={cn(
                    "sidebar-item rounded-[1rem] hover-link-effect",
                    collapsed ? "p-[0_1.5rem]" : "py-0 pl-5 pr-10",
                    isActive ? "is-select" : ""
                )}
                {...props}
            >
                {children}
            </Link>
        </div>
    );

    if (!collapsed || !tooltip) {
        return item;
    }

    return (
        <Tooltip tooltip={tooltip} tooltipPosition={tooltipPosition}>
            <TooltipTrigger>{item}</TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
};

export const SidebarItemHighlight = ({ children, ...props }: SidebarProps) => {
    return (
        <div
            className="relative border-b border-solid border-[var(--color-sidebar-border-line)] transition-[height_.3s_cubic-bezier(.4,0,.2,1),padding_.3s_cubic-bezier(.4,0,.2,1)]"
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarItemTitle = ({ children, title }: SidebarProps) => {
    const { collapsed } = useSidebar()
    return (
        <div className="border-b-0 flex flex-col p-0">
            <div className="pb-0">
                {collapsed ? (
                    <></>
                ) : (
                    <div className="text-[.75rem]/[1rem] font-normal text-[var(--color-sidebar-ink-2)] py-[.875rem] px-6">
                        {title}
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

export const SidebarItemContent = ({ children, ...props }: SidebarProps) => {
    return (
        <div
            className="flex items-center"
            {...props}
        >
            {children}
        </div>
    )
}

export const SidebarItemContentIcon = ({ children, className, ...props }: SidebarProps) => {
    return (
        <span
            className={cn(
                "icon icon-16 overflow-visible",
                className ? className : ""
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export const SidebarItemContentLabel = ({ label, className, ...props }: SidebarProps) => {
    const { collapsed } = useSidebar()
    if (collapsed) return null;
    return (
        <div
            className={cn(
                className ? className : "ml-4 pr-8",
                "overflow-hidden text-ellipsis whitespace-nowrap transition-[opacity_.3s_cubic-bezier(.4,0,.2,1)]",
                collapsed ? "opacity-0 link-name" : ""
            )}
            {...props}
        >
            {label}
        </div>
    )
}

export const SidebarToggleButton = ({ children }: SidebarProps) => {
    const { collapsed, setCollapsed, isSmallScreen } = useSidebar();
    const handleClick = async () => {
        const newState = !collapsed;
        setCollapsed?.(newState);
        await setSidebarCookie(SIDEBAR_COOKIE_KEY, newState);
    };
    if (isSmallScreen) return
    return (
        <>
            <div className="border-[var(--color-sidebar-border-line)] border-t m-[0_.625rem]" />
            <button
                className="bg-[rgba(0,0,0,0)] border-none cursor-pointer flex flex-none items-center h-11 py-[.625rem] px-6 relative"
                onClick={handleClick}
            >
                <div
                    className={cn(
                        "text-[var(--color-sidebar-ink-2)] absolute overflow-visible right-[1.375rem] transition-[transform_.3s_cubic-bezier(.4,0,.2,1),color_.1s_cubic-bezier(.4,0,.2,1)]",
                        collapsed ? "" : "rotate-180"
                    )}
                >
                    {children}
                </div>
            </button >
        </>
    )
}
export const SidebarToggleButtonIcon = ({ children, className, ...props }: SidebarProps) => {
    return (
        <span
            className={cn(
                "icon icon-16",
                className ? className : ""
            )}
            {...props}
        >
            {children}
        </span>
    )
}
