import "./table.css"

import { cn } from "@/lib/utils/cn"

interface TableProps {
    children?: React.ReactNode;
    className?: string
    onClick?: () => void;
}
interface TableHeadEmptyProps extends TableProps {
    colSpan?: number;
}

export const Table = ({ children }: TableProps) => {
    return (
        <table className="min-w-full border-0 border-spacing-0 table-auto whitespace-normal bg-[var(--color-table-bg)]">
            {children}
        </table>
    )
}

export const TableHeader = ({ children }: TableProps) => {
    return (
        <thead className="bg-inherit">
            {children}
        </thead>
    )
}

export const TableBody = ({ children }: TableProps) => {
    return (
        <tbody className="bg-inherit text-[.875rem]/[1rem] [&_tr:not(.empty):hover]:bg-[var(--color-table-bg-hover)] [&_tr:not(.empty):hover]:cursor-pointer">
            {children}
        </tbody >
    )
}

export const TableRow = ({ children, className, onClick }: TableProps) => {
    return (
        <tr
            onClick={onClick}
            className={cn(
                "bg-inherit text-[var(--color-table-text)] text-xs",
                className ? className : ""
            )}
        >
            {children}
        </tr>
    )
}

export const TableHead = ({ children, className }: TableProps) => {
    return (
        <th
            className={cn(
                "table-th p-[0_8px_0_8px] text-[var(--color-table-text)]",
                className ? className : ""
            )}
        >
            {children}
        </th>
    )
}
export const TableHeadText = ({ children, className }: TableProps) => {
    return (
        <div
            className={cn(
                "flex flex-row items-center text-[var(--color-table-text)] font-inherit",
                className ? className : ""
            )}
        >
            <span className="relative whitespace-pre-wrap" style={{ wordBreak: "break-all" }}>
                {children}
            </span>
        </div>
    )
}
export const TableHeadEmpty = ({ children, className, colSpan }: TableHeadEmptyProps) => {
    return (
        <tr
            className="bg-inherit text-[var(--color-table-text)] text-xs empty"
        >
            <th
                className={cn(
                    className ? className : ""
                )}
                colSpan={colSpan}
            >
                <div className="flex flex-col items-center text-[.875rem]/[1.25rem] text-[var(--color-table-text)] font-inherit">
                    {children}
                </div>
            </th>
        </tr>

    )
}

export const TableCell = ({ children, className }: TableProps) => {
    return (
        <td
            className={cn(
                "table-th pl-6 text-[rgba(0,0,0,.64)] p-[0_8px_0_8px] leading-[0]",
                className ? className : ""
            )}
        >
            {children}
        </td>
    )
}

