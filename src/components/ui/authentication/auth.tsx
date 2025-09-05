import "./auth.css"

import { cn } from "@/lib/utils/cn"
import { AuthButtonProps, AuthFeedbackProps, AuthFooterProps, AuthFormProps, AuthHeaderProps, AuthInputProps, AuthProps, ContinueWithButtonProps } from "./props"
import React, { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
export const Close = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            fill="none" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
        >
            <path d="M1.791.722a.756.756 0 0 0-1.07 1.07L3.932 5 .72 8.209a.756.756 0 1 0 1.07 1.07L5 6.068l3.209 3.21a.756.756 0 0 0 1.07-1.07L6.068 5l3.21-3.209a.756.756 0 1 0-1.07-1.07L5 3.932 1.791.72Z" fill="currentColor" />
        </svg>
    )
}
export const EyeSlash = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1280 1024">
            <g id="icomoon-ignore">
            </g>
            <path fill="currentColor"
                d="M77.6 10.2c-20.8-16.4-51-12.6-67.4 8.2s-12.6 51 8.2 67.4l1184 928c20.8 16.4 51 12.6 67.4-8.2s12.6-51-8.2-67.4l-210.4-164.8c79.2-81.2 132.8-172.2 159.8-236.8 6.6-15.8 6.6-33.4 0-49.2-29.8-71.4-92.4-175.4-186-262.2-94-87.6-223.4-161.2-385-161.2-136.4 0-250 52.6-338.6 121.6l-223.8-175.4zM446.2 299c51-46.6 119.2-75 193.8-75 159 0 288 129 288 288 0 49.8-12.6 96.6-34.8 137.4l-77.2-60.4c16.8-38.6 21.2-82.8 9.6-126.6-22.2-83-95.6-138.8-177.2-142.2-11.6-0.4-18.4 12.2-14.8 23.4 4.2 12.8 6.6 26.4 6.6 40.6 0 20.4-4.8 39.6-13.2 56.6l-180.6-141.6zM746 779.8c-32.8 13-68.6 20.2-106 20.2-159 0-288-129-288-288 0-13.8 1-27.2 2.8-40.4l-188.6-148.6c-45.6 59.4-78.2 118.6-97.2 164.4-6.6 15.8-6.6 33.4 0 49.2 29.8 71.4 92.4 175.4 186 262.2 94 87.6 223.4 161.2 385 161.2 95.6 0 179.8-25.8 252.4-65l-146.4-115.2z"></path>
        </svg>
    )
}
export const Eye = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1152 1024">
            <g id="icomoon-ignore">
            </g>
            <path fill="currentColor"
                d="M576 64c-161.6 0-291 73.6-385.2 161.2-93.6 86.8-156.2 190.8-185.8 262.2-6.6 15.8-6.6 33.4 0 49.2 29.6 71.4 92.2 175.4 185.8 262.2 94.2 87.6 223.6 161.2 385.2 161.2s291-73.6 385.2-161.2c93.6-87 156.2-190.8 186-262.2 6.6-15.8 6.6-33.4 0-49.2-29.8-71.4-92.4-175.4-186-262.2-94.2-87.6-223.6-161.2-385.2-161.2zM288 512c0-159.058 128.942-288 288-288s288 128.942 288 288v0c0 159.058-128.942 288-288 288s-288-128.942-288-288v0zM576 384c0 70.6-57.4 128-128 128-14.2 0-27.8-2.4-40.6-6.6-11-3.6-23.8 3.2-23.4 14.8 0.6 13.8 2.6 27.6 6.4 41.4 27.4 102.4 132.8 163.2 235.2 135.8s163.2-132.8 135.8-235.2c-22.2-83-95.6-138.8-177.2-142.2-11.6-0.4-18.4 12.2-14.8 23.4 4.2 12.8 6.6 26.4 6.6 40.6z"></path>
        </svg>
    )
}
export const CircleCheck = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1024 1024">
            <g id="icomoon-ignore">
            </g>
            <path fill="currentColor"
                d="M512 1024c282.77 0 512-229.23 512-512s-229.23-512-512-512v0c-282.77 0-512 229.23-512 512s229.23 512 512 512v0zM738 418l-256 256c-18.8 18.8-49.2 18.8-67.8 0l-128-128c-18.8-18.8-18.8-49.2 0-67.8s49.2-18.8 67.8 0l94 94 222-222.2c18.8-18.8 49.2-18.8 67.8 0s18.8 49.2 0 67.8z"></path>
        </svg>
    )
}

export const CircleExclamation = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1024 1024">
            <g id="icomoon-ignore">
            </g>
            <path
                fill="currentColor"
                d="M512 1024c282.77 0 512-229.23 512-512s-229.23-512-512-512v0c-282.77 0-512 229.23-512 512s229.23 512 512 512v0zM512 256c26.6 0 48 21.4 48 48v224c0 26.6-21.4 48-48 48s-48-21.4-48-48v-224c0-26.6 21.4-48 48-48zM448 704c0-35.346 28.654-64 64-64s64 28.654 64 64v0c0 35.346-28.654 64-64 64s-64-28.654-64-64v0z"></path>
        </svg>

    )
}
export const ImageEmpty = ({ className }: { className?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} style={{ opacity: .5 }}>
            <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
        </svg>
    )
}
export const AuthBody = ({ children, className }: AuthProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-stretch justify-start gap-6",
                className ? className : ""
            )}
        >
            {children}
        </div>
    )
}

export const AuthButton = ({ disabled, label, loadingLabel = "Activating...", icon, onClick }: AuthButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "m-0 p-[.375rem_.75rem] rounded-[.375rem] font-medium text-[.8125rem] bg-[var(--primary-color)] text-white shadow-[var(--color-shadow-heavy)] hover:opacity-[.8]",
                disabled ? "cursor-not-allowed opacity-[.8]" : ""
            )}
        >
            <span className="flex flex-row items-center justify-center">

                {disabled ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="ml-2 text-[.688rem] tracking-widest">{loadingLabel}</span>
                    </>
                ) : (
                    <>
                        {label}
                        {icon && (
                            <span className="ml-2 opacity-[.62] text-[.688rem]">
                                {icon}
                            </span>
                        )}
                    </>
                )}
            </span>
        </button >
    )
}

export const AuthCard = ({ children }: AuthProps) => {
    return (
        <div className="bg-white text-center rounded-lg relative z-[10] p-[2rem_2.5rem] shadow-[var(--color-shadow-light)]">
            <div className="flex flex-col items-stretch justify-start gap-6">
                {children}
            </div>
        </div>
    )
}

export const AuthContainer = ({ children, className }: AuthProps) => {
    return (
        <div
            className={cn(
                "flex min-w-[25rem] flex-col items-center justify-center",
                className ? className : "min-h-screen"
            )}
        >
            <div className="overflow-hidden [@media(min-width:25rem)]:w-[25rem]  w-full rounded-xl shadow-[var(--color-shadow-deep)]">
                {children}
            </div>
        </div>
    )
}

export const AuthFeedback = ({ show, status, text }: AuthFeedbackProps) => {
    if (!show || !text) return null;
    const error = status === "error"
    const success = status === "success"
    const baseClass = "m-[.375rem_0rem_0rem] text-[.8125rem] flex gap-2 text-left animate-fade-in items-center"
    return (
        <div
            className="flex flex-row flex-nowrap items-stretch justify-start font-normal leading-[1.38462] animate-fade-out"
            style={{ position: "relative" }}
        >
            {show && (
                <>
                    {error && (
                        <p
                            className={cn(
                                baseClass,
                                "text-[var(--text-error)]",
                                show ? "visible" : "invisible"
                            )}
                        >
                            <span className="w-4 h-4 flex-shrink-0" >
                                <CircleExclamation />
                            </span>
                            {text}
                        </p>
                    )}
                    {success && (
                        <p
                            className={cn(
                                baseClass,
                                "text-[var(--text-success)]",
                                show ? "visible" : "invisible"
                            )}
                        >
                            <span className="w-4 h-4 text-[var(--text-success)] flex-shrink-0" >
                                <CircleCheck />
                            </span>
                            {text}
                        </p>
                    )}
                    {!error && !success && (
                        <p
                            className={cn(
                                baseClass,
                                "text-[var(--text-secondary)]",
                                show ? "visible" : "invisible"
                            )}
                        >
                            {text}
                        </p>
                    )}
                </>
            )}

        </div>
    )
}

export const AuthFooter = ({ children }: AuthFooterProps) => {
    return (
        <div className="flex items-center justify-between mt-[-.5rem] pt-[.5rem] bg-[linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),linear-gradient(rgb(255,255,255),rgb(255,255,255))]">
            {children}
        </div>
    )
}
export const AuthFooterForgotPassword = ({ linkHref, text }: AuthFooterProps) => {
    return (
        <div className="m-auto py-4">
            <a href={linkHref} className="ml-1 font-medium text-[0.8125rem] text-[var(--primary-color)] leading-[1.38462] cursor-pointer no-underline hover:underline">
                {text}
            </a>
        </div>
    )
}
export const AuthFooterTextWithLink = ({ text, linkHref, linkText }: AuthFooterProps) => {
    return (
        <div className="first-of-type:p-[1rem_2rem] m-[0_auto]">
            <span className="m-0 text-[0.8125rem] text-[rgb(116,118,134)] font-normal leading-[1.38462]">{text}</span>
            <a href={linkHref} className="ml-1 font-medium text-[0.8125rem] text-[var(--primary-color)] leading-[1.38462] cursor-pointer no-underline hover:underline">
                {linkText}
            </a>
        </div>
    )
}

export const AuthForm = ({ children, onSubmit }: AuthFormProps) => {
    return (
        <form className="flex flex-col items-stretch justify-start gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
        >
            {children}
        </form>
    )
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => {
    return (
        <div className="mb-1">
            <h1 className="font-bold text-[1.0625rem] leading-[1.41176]">{title}</h1>
            <p className="text-[0.8125rem] font-normal leading-[1.38462] text-[var(--text-secondary)]">{description}</p>
        </div>
    )
}

export const AuthInput = ({
    children,
    type,
    label,
    placeholder,
    pattern,
    className,
    value,
    inputRef,
    onChange,
    onFocus,
    onBlur
}: AuthInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="flex flex-col justify-between gap-4">
            <label className="flex font-bold text-[0.8125rem] leading-3">{label}</label>
            <div className="flex items-stretch justify-center relative flex-col flex-nowrap">
                <input
                    ref={inputRef}
                    type={isPassword && showPassword ? "text" : type}
                    required
                    placeholder={placeholder}
                    pattern={pattern}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    autoComplete="off"
                    data-feedback="success"
                    className={cn(
                        "m-0 p-[.375rem_.75rem] max-h-[2.25rem] w-full font-normal text-[0.8125rem] rounded-[0.375rem] shadow-[var(--color-shadow-border-soft)] outline outline-transparent",
                        className ? className : "hover:shadow-[var(--color-shadow-soft-strong)] focus:shadow-[var(--color-shadow-strong)]"
                    )}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-9 h-9 m-[0rem_.016rem_0rem_0rem] p-[.25rem_.75rem] cursor-pointer rounded-[.375rem] absolute right-0 text-[rgba(0,0,0,.41)] hover:text-[var(--primary-color)] hover:bg-[var(--hover-bg-soft)]"
                    >
                        {showPassword ? <EyeSlash /> : <Eye />}
                    </button>
                )}
            </div>
            {children}
        </div>

    )
}

export const ContinueWithButtonGrid = ({ children }: AuthProps) => {
    const buttonCount = React.Children.count(children);
    const columnCount = Math.min(buttonCount, 5);
    return (
        <div
            className="grid items-stretch gap-2 justify-center"
            style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
        >
            {children}
        </div>
    );
};

export const ContinueWithButton = ({ label, icon, onClick }: ContinueWithButtonProps) => {
    const lastWord = label.trim().split(" ").pop() || "";
    return (
        <button
            onClick={onClick}
            className="p-[.375rem_.75rem] m-0 text-[rgba(0,0,0,.62)] rounded-[.375rem] relative shadow-[var(--color-shadow-soft)] hover:bg-[var(--hover-bg-soft)]">
            <span className="flex flex-row items-center justify-center gap-3 w-full overflow-hidden">
                <span className="flex-[0_0_1rem]">
                    <span className="w-[1rem] h-auto" >{icon}</span>
                </span>
                <span className="text-[.8125rem] last-word">{lastWord}</span>
                <span className="text-[.8125rem] label-text">{label}</span>
            </span>
        </button>
    )
}

export const OrDivider = () => {
    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex-[1_1_0%] h-px bg-[rgba(0,0,0,.07)]"></div>
            <p className="font-normal text-[rgb(116,118,134)] m-[0rem_1rem]">or</p>
            <div className="flex-[1_1_0%] h-px bg-[rgba(0,0,0,.07)]"></div>
        </div>
    )
}


// userProfile

export interface UserProfileProps {
    children?: React.ReactNode;
    className?: string;
    img?: string;
    email?: string;
};
export interface UserProfileInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    maxLength?: number;
    showCounter?: boolean;
}
export interface UserProfileAvatarSectionProps extends UserProfileProps {
    text?: string;
    onChangeImage?: (file: File | null) => void;
}

export interface UserProfileContextType extends UserProfileProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    user?: Record<string, unknown> | null;
}


const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const useUserProfile = () => {
    const ctx = useContext(UserProfileContext);
    if (!ctx) throw new Error("useUser must be used inside ActivityBar");
    return ctx;
};


export const UserProfile = ({ open, setOpen, children, user }: UserProfileContextType) => {
    const [isOpen, setIsOpen] = useState(false)
    const controlledOpen = open ?? isOpen;
    const controlledSetOpen = setOpen ?? setIsOpen;
    if (!open) return null
    return (
        <UserProfileContext.Provider value={{ user, open: controlledOpen, setOpen: controlledSetOpen }}>
            {children}
        </UserProfileContext.Provider>
    )
}

export const UserProfileContent = ({ children }: UserProfileProps) => {
    const { setOpen } = useUserProfile();

    return createPortal(
        <div className="relative z-[9999]">
            <div
                className="fixed inset-0 z-50 bg-[#000000ba] flex items-center justify-center pointer-events-auto"
                onClick={() => setOpen?.(false)}
            />
            <div
                className="up-content fixed z-50 left-1/2 top-1/2 grid translate-x-[-50%] translate-y-[-50%]"
            >
                <div
                    className="flex flex-row items-stretch justify-start relative box-border outline-0 h-[min(44rem,100%-3rem)] m-0"
                >
                    <div
                        className="ox-border w-fit not-italic"
                    >
                        <div
                            className="box-border z-[9999] flex flex-row items-stretch justify-start isolate w-[55rem] max-w[calc(-2rem+100vw)] overflow-hidden h-[44rem] relative "
                        >
                            <UserProfileClose />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export const UserProfileClose = () => {
    const { setOpen } = useUserProfile();
    return (
        <div className="close box-border z-[9999] absolute top-[calc(1rem*.5)] right-[calc(1rem*.5)]">
            <button
                onClick={() => setOpen?.(false)}
                className="inline-flex items-center justify-center m-0 outline-0 select-none cursor-pointer bg-[unset] rounded-md relative isolate tracking-normal text-[#212126a6] p-[calc(1rem*.75)] text-[.8125rem]/[1.38462] font-medium hover:bg-[#00000008] hover:text-[#59595f]">
                <Close className="flex-shrink-0 w-3 h-3" />
            </button>
        </div>
    )
}

export const UserProfileContainer = ({ children }: UserProfileProps) => {
    return (
        <div className="box-border flex flex-col items-stretch justify-start bg-white relative rounded-lg w-full overflow-hidden -my-px -mr-px">
            <div className="box-border flex flex-col items-stretch justify-start flex-1 py-[calc(1rem*1.75)] px-[calc(1rem*2)] pr-[calc(1rem*1.5)]">
                {children}
            </div>
        </div>
    )
}

export const UserProfileHeader = ({ title }: { title: string }) => {
    return (
        <div className="mb-0 h-14">
            <div className="flex flex-col h-14 p-[0_1.5rem] border-b border-solid border-[var(--theme-color-border-line)]">
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-1 items-center max-w-full overflow-hidden">
                        <h1 className="m-0 text-base font-bold pr-6 overflow-hidden text-ellipsis whitespace-normal text-[var(--text-secondary)]">{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const UserProfileAvatarWrapper = ({ children }: UserProfileProps) => {
    return (
        <div className="pb-6 rounded-[0_0_1rem_1rem]">
            <div className="!rounded-[0_0_1rem_1rem] overflow-hidden">
                <div className="pt-0">{children}</div>
            </div>
        </div>
    )
}


export const UserProfileAvatarSection = ({ text, img, email, onChangeImage }: UserProfileAvatarSectionProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            onChangeImage?.(file);
        }
    };
    const DEFAULT_AVATAR = "./image-empty.svg";

    const actualImage = previewUrl?.trim() || img?.trim();
    const imageSrc = actualImage || DEFAULT_AVATAR;

    return (
        <div className="account-info-edit-avatar flex flex-col items-center rounded-none mt-0 p-[1.5rem_0_2rem_0] select-none">
            <div className="flex items-center justify-center relative w-28 h-28 mb-7">
                {actualImage ?
                    <Image
                        className="bg-white align-top rounded-full shadow-[inset_0_0_0_3px_#f1f4f9]"
                        src={imageSrc}
                        alt={email ?? "User Avatar"}
                        sizes="7rem"
                        fill
                        loading="eager"
                        priority
                    />
                    :
                    <ImageEmpty />}

            </div>
            <div className="flex items-center justify-center relative">
                <button
                    onClick={handleClick}
                    className="inline-block overflow-hidden text-ellipsis whitespace-normal text-center outline-none border-none max-w-[25rem] text-[var(--theme-color-ink-2)] bg-[var(--bg-button)] font-normal rounded-[.875rem] text-sm/7 h-7 min-w-[3.25rem] p-[0_1rem] hover:bg-[var(--bg-button-hover)] hover:text-white"
                >
                    {text}
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                />
            </div>
        </div>
    )
}



export const UserProfileFormWrapper = ({ children }: UserProfileProps) => (
    <div className="mt-0 rounded-none p-[1rem_1rem_2.5rem]">
        {children}
    </div>
);

export const UserProfileInput = ({ value, onChange, label, maxLength = 20, placeholder = "", showCounter = false }: UserProfileInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="mt-6">
                <div className="leading-5 text-[var(--text-secondary)]">{label}</div>
            </div>
            <div className="text-sm/5 mt-2 p-0 rounded-lg border border-solid border-[var(--theme-color-border-line)]">
                <div className="relative">
                    <div className="flex justify-center border-none rounded-lg h-9">
                        <input
                            value={value}
                            onChange={onChange}
                            type="text"
                            autoComplete="off"
                            placeholder={placeholder}
                            maxLength={maxLength}
                            className="h-full relative rounded-[inherit] grow z-[2] border-none bg-transparent p-[.625rem] focus-visible:outline-none focus:shadow-[var(--color-shadow-strong)] hover:shadow-[var(--color-shadow-soft-strong)]" style={{ fontSize: "inherit" }} />
                    </div>
                    {showCounter && (
                        <div className="absolute -mt-2 top-auto right-[.625rem] bottom-[.625rem] pointer-events-none text-sm/4 z-[1] text-[var(--text-secondary)] select-none">{value?.length}/{maxLength}</div>
                    )}
                </div>
            </div>
        </div>
    )
}