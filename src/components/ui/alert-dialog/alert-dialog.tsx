
import "./alert-dialog.css"
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

type AlertDialogProps = React.HTMLAttributes<HTMLDivElement>;

type AlertDialogActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface AlertDialogContextType extends AlertDialogProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}


const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

const useAlertDialog = () => {
    const ctx = useContext(AlertDialogContext);
    if (!ctx) throw new Error("useUser must be used inside ActivityBar");
    return ctx;
};

export const AlertDialog = ({ open, setOpen, children }: AlertDialogContextType) => {
    const [isOpen, setIsOpen] = useState(false)
    const controlledOpen = open ?? isOpen;
    const controlledSetOpen = setOpen ?? setIsOpen;

    if (!open) return null
    return (
        <AlertDialogContext.Provider value={{ open: controlledOpen, setOpen: controlledSetOpen }}>
            {children}
        </AlertDialogContext.Provider>

    );
};

export const AlertDialogContent = ({ children, ...props }: AlertDialogProps) => {
    const { setOpen } = useAlertDialog();

    return createPortal(
        <div className="alert-dialog-content relative z-[9999]">

            <div
                className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-auto"
                onClick={() => setOpen?.(false)}
            />
            <div
                className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[var(--color-alert-dialog-bg)] border-[var(--color-alert-dialog-text)]/20 p-6 shadow-lg duration-200 sm:rounded-lg"
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}

export const AlertDialogHeader = ({ children, className, ...props }: AlertDialogProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-3 space-y-2 text-center sm:text-left",
                className ? className : ""
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export const AlertDialogFooter = ({ children, className, ...props }: AlertDialogProps) => {
    return (
        <div
            className={cn(
                "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export const AlertDialogTitle = ({ children, className, ...props }: AlertDialogProps) => {
    return (
        <h2
            className={cn(
                "text-lg font-semibold text-[var(--color-alert-dialog-text)]",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    )
}

export const AlertDialogDescription = ({ children, className, ...props }: AlertDialogProps) => {
    return (
        <p
            className={cn(
                "text-sm text-[var(--color-alert-dialog-text)]/60",
                className
            )}
            {...props}
        >
            {children}
        </p>
    )
}

export const AlertDialogTrigger = ({ children, className, ...props }: AlertDialogActionProps) => {
    const { setOpen } = useAlertDialog();
    return (
        <button
            onClick={() => setOpen?.(true)}
            className={cn(
                className ? className : ''
            )}
            {...props}
        >
            {children}
        </button>
    )
}
export const AlertDialogCancel = ({ children, className, ...props }: AlertDialogActionProps) => {
    const { setOpen } = useAlertDialog();
    return (
        <button
            type="button"
            className={cn(
                "inline-flex justify-center items-center gap-2 whitespace-normal rounded-md text-sm font-medium transition-colors bg-[var(--color-alert-dialog-cancel-bg)] text-[var(--color-alert-dialog-cancel-text)] hover:bg-[var(--color-alert-dialog-cancel-bg-hover)]/10 h-9 px-4 py-2 border border-[var(--color-alert-dialog-cancel-border)]/10",
                className
            )}
            onClick={() => setOpen?.(false)}
            {...props}
        >
            {children}
        </button>
    )
}

export const AlertDialogAction = ({ children, onClick, disabled, ...props }: AlertDialogActionProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type="button"
            className={cn(
                "inline-flex justify-center items-center gap-2 whitespace-normal rounded-md text-sm font-medium transition-colors bg-[var(--color-alert-dialog-action-bg)] text-[var(--color-alert-dialog-action-text)] h-9 px-4 py-2",
                disabled ? "disabled:cursor-not-allowed opacity-45" : "hover:opacity-80",
            )}
            {...props}
        >
            {disabled && (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
            )}
            {children}
        </button>
    )
}

export const AlertDialogClosed = ({ children, ...props }: AlertDialogActionProps) => {
    const { setOpen } = useAlertDialog();

    return (
        <button
            className="flex items-center justify-center cursor-pointer absolute w-7 h-7 right-4 top-4 rounded-[50%] opacity-70 ring-offset-background transition-opacity hover:opacity-100 group"
            onClick={() => setOpen?.(false)}
            {...props}
        >
            <span className="inset-0 absolute pointer-events-none rounded-[inherit] group-hover:before:opacity-[.2] group-hover:before:bg-[var(--color-alert-dialog-closed-bg-hover)] group-hover:before:inset-0 group-hover:before:absolute group-hover:before:rounded-[inherit]"></span>
            <span className="flex items-center justify-center text-[1.25rem] size-5">
                {children}
            </span>
        </button>
    )
}
