import { cn } from "@/lib/utils/cn";
import "./breadcrumb.css";

type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement>;

export const Breadcrumb = ({ children, className, ...prop }: BreadcrumbProps) => {
    return (
        <div
            className={cn(
                "breadcrumb",
                className
            )}
            {...prop}
        >
            {children}
        </div>
    )
}
export const BreadcrumbList = ({ children, className, ...prop }: BreadcrumbProps) => {
    return (
        <div
            className={cn(
                "breadcrumb-list",
                className ? className : "flex flex-wrap gap-1.5 break-words text-sm text-[var(--color-breadcrumb-text)] items-center"
            )}
            {...prop}
        >
            {children}
        </div>
    )
}

export const BreadcrumbItem = ({ children, className, ...prop }: BreadcrumbProps) => {
    return (
        <div
            className={cn(
                "breadcrumb-item",
                className ? className : "iinline-flex items-center gap-1.5 last:text-[var(--color-breadcrumb-text-hover)]"
            )}
            {...prop}
        >
            {children}
        </div>
    )
}
export const BreadcrumbLink = ({ children, className, ...prop }: BreadcrumbProps) => {
    return (
        <div
            className={cn(
                "breadcrumb-link",
                className ? className : "hover:text-[var(--color-breadcrumb-text-hover)] cursor-pointer last:text-inherit last:cursor-default"
            )}
            {...prop}
        >
            {children}
        </div>
    )
}

export const BreadcrumbSeparator = ({ children, className, ...prop }: BreadcrumbProps) => {
    return (
        <div
            className={cn(
                "breadcrumb-separator",
                className ? className : "[&>svg]:size-3.5"
            )}
            {...prop}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
            >
                <path d="m9 18 6-6-6-6" />
            </svg>
        </div>
    )
}