
import "./element.css"
import { cn } from "@/lib/utils/cn"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    sizeIcon?: string
}
interface ButtonSaveProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
}

export const ButtonIcon = ({
    children,
    className,
    sizeIcon,
    onClick,
    ...props
}:
    ButtonProps
) => {
    return (
        <button
            className={cn(
                "relative p-2 flex justify-center items-center rounded-[50%] cursor-pointer group",
                className ? className : "size-10"
            )}
            onClick={onClick}
            {...props}
        >
            <span className="inset-0 absolute pointer-events-none rounded-[inherit] group-hover:before:opacity-[.2] group-hover:before:bg-[var(--color-button-icon-bg)] group-hover:before:inset-0 group-hover:before:absolute group-hover:before:rounded-[inherit]" />
            <span
                className={cn(
                    "text-center text-[1.25rem] [&>*]:size-[inherit] [&>*]:[font-size:inherit]",
                    sizeIcon ? sizeIcon : "size-4"

                )}

            >
                {children}
            </span>
        </button>
    )
}

export const Button = ({
    children,
    className,
    sizeIcon,
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center select-none relative group rounded-[.5rem] border border-solid border-[var(--color-button-bg)] py-0 cursor-pointer disabled:opacity-50 disabled:cursor-context-menu hover:border-[var(--color-button-bg-hover)]",
                className ? className : "px-4 h-9"
            )}
            onClick={onClick}
            {...props}
        >
            <span className="inset-0 absolute pointer-events-none rounded-[inherit] group-hover:before:opacity-[.2] group-hover:before:bg-[var(--color-button-bg-hover)] group-hover:before:inset-0 group-hover:before:absolute group-hover:before:rounded-[inherit]"></span>
            <span className="z-1 relative text-[var(--color-button-bg)]"> {children} </span>
        </button>
    )
}

export const ButtonSave = ({ className, disabled, onClick, text, ...props }: ButtonSaveProps) => {
    return (
        <div className="text-sm/5 mt-2">
            <button
                disabled={disabled}
                onClick={onClick}
                className={cn(
                    "block max-w-[25rem] p-[0_1.5rem] min-w-20 h-11 text-base/[2.75rem] rounded-[1.375rem] font-bold m-[3rem_auto_0] select-none text-center whitespace-nowrap text-ellipsis overflow-hidden hover:bg-[var(--color-button-save-bg-hover)] hover:text-white",
                    disabled ? "disabled:cursor-not-allowed bg-[var(--color-button-save-bg-disabled)] text-white opacity-50" : "bg-[var(--color-button-save-bg)] text-[var(--color-button-save-text)]",
                    className ? className : ""
                )}
                {...props}
                style={{ width: "17.5rem" }}
            >
                <span className="flex flex-row items-center justify-center">
                    {disabled && (
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    )}
                    <span>
                        {text}
                    </span>
                </span>
            </button>
        </div>
    )
}
