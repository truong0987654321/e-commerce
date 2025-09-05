
export interface AuthProps {
    children?: React.ReactNode;
    className?: string
}

export interface AuthButtonProps extends AuthProps {
    label: string;
    disabled?: boolean;
    loadingLabel?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export interface AuthFeedbackProps extends AuthProps {
    show?: boolean;
    status?: "error" | "success" | "message";
    text?: string;
}

export interface AuthInputProps extends AuthProps {
    type: string;
    label: string;
    placeholder?: string;
    pattern?: string;
    value: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocusChange?: (isFocused: boolean) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface AuthFooterProps extends AuthProps {
    linkText?: string;
    linkHref?: string;
    text?: string;
}

export interface AuthHeaderProps {
    title: string,
    description?: string
}

export interface ContinueWithButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
}
export interface AuthFormProps extends AuthProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
