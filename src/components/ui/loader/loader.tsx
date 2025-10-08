import { cn } from "@/lib/utils/cn";
import "./loader.css"
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>

export const ListItemSkeleton = () => {
    return (
        <LoaderContainer>
            <div className="h-12 w-12 rounded-full bg-gray-400" />
            <div className="flex-1">
                <div className="mb-1 h-5 w-[90%] rounded-lg bg-gray-400 text-sm" />
                <div className="h-5 w-3/5 rounded-lg bg-gray-400 text-lg" />
            </div>
        </LoaderContainer>
    );
}

export const LoaderContainer = ({ children, className, ...props }: Props) => {
    return (
        <div className={cn(
            "relative flex animate-pulse gap-2 items-center",
            className ? className : "w-64"
        )}
            {...props}
        >
            {children}
        </div>
    )
}

export const LoaderAvatar = ({ className, ...props }: Props) => {
    return (
        <div className={cn(
            "!rounded-full",
            className ? className : "size-12"
        )}
            {...props}
        />
    )
}

export const LoaderContent = ({ children, className, ...props }: Props) => {
    return (
        <div className={cn(
            "flex-1 [&>*:not(:first-child)]:mt-1 [&>*]:rounded-lg",
            className ?? className
        )}
            {...props}
        >
            {children}
        </div>
    )
}

export const LoaderLine = ({ className, ...props }: Props) => {
    return (
        <div className={cn(
            className ?? className
        )}
            {...props}
        />
    )
}

export const LoaderStatus = () => {
    return (
        <LoaderContainer>
            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-gray-400" />
        </LoaderContainer>
    )
}

export const CardSkeleton = () => {
    return (
        <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
                <svg viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-10 h-10 text-gray-200 dark:text-gray-600">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400" />
            <div className="flex items-center mt-4">
                <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-10 h-10 me-3 text-gray-200 dark:text-gray-400">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2" />
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400" />
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col border border-gray-200 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
            <div className="bg-neutral-400/50 w-full h-32 rounded-md" />
            <div className="flex flex-col gap-2">
                <div className="bg-neutral-400/50 w-full h-4 rounded-md" />
                <div className="bg-neutral-400/50 w-4/5 h-4 rounded-md" />
                <div className="bg-neutral-400/50 w-full h-4 rounded-md" />
                <div className="bg-neutral-400/50 w-2/4 h-4 rounded-md" />
            </div>
        </div>
    );
};

export const SimpleCardSkeleton = () => {
    return (
        <div className="w-72 p-4 text-center rounded-xl bg-white border border-gray-200">
            <div className="card__skeleton h-[.938rem] mb-[.938rem]" />
            <div className="card__skeleton h-[6.25rem]" />
        </div>
    );
}