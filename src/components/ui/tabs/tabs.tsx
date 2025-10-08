"use client";

import "./tabs.css"
import { cn } from "@/lib/utils/cn";
import { createContext, useContext, useState } from "react";

type TabsBasicProps = React.HTMLAttributes<HTMLDivElement>;

type TabsContextType = {
    value: string;
    setValue: (v: string) => void;
    activeClassName?: string;
    inactiveClassName?: string;
};

interface TabsProps extends TabsBasicProps {
    defaultValue: string;
    activeClassName?: string;
    inactiveClassName?: string;
}
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}
interface TabsContentProps extends TabsBasicProps {
    value: string
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("useTabs must be used within Tabs");
    return context;
};

export const Tabs = ({
    defaultValue,
    children,
    className,
    activeClassName,
    inactiveClassName,
    ...props
}: TabsProps) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue, activeClassName, inactiveClassName }}>
            <div
                className={cn(
                    "flex flex-col",
                    "md:flex-row",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider >
    );
}

export const TabsList = ({ children, className, ...props }: TabsBasicProps) => {
    return (
        <div
            className={cn(
                "border-b border-[#0000001a]",
                className ? className : "flex flex-row"
            )}
            {...props}
        >{children}</div>
    );
}

export const TabsTrigger = ({
    value,
    children,
    className,
    ...props
}: TabsTriggerProps) => {
    const { value: activeValue, setValue, activeClassName, inactiveClassName } = useTabs();
    const isActive = activeValue === value;

    const activeClass = activeClassName ?? "font-bold text-blue-600 border-b-2 border-blue-600";
    const inactiveClass = inactiveClassName ?? "text-gray-500 hover:text-gray-700";

    return (
        <button
            onClick={() => setValue(value)}
            className={cn(
                className ? className : "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive ? activeClass : inactiveClass,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export const TabsContent = ({
    value,
    children,
    className,
    ...props
}: TabsContentProps) => {
    const { value: activeValue } = useTabs();
    if (activeValue !== value) return null;
    return (
        <div
            className={cn(
                "p-4 bg-[#fafafa] w-full",
                className
            )}
            {...props}
        >
            {children}</div>
    )
}
