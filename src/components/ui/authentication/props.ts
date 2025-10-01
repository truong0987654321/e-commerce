
export interface AuthProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    loadingLabel?: string;
    icon?: React.ReactNode;
}

export interface AuthFeedbackProps extends AuthProps {
    show?: boolean;
    status?: "error" | "success" | "message";
    text?: string;
}

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    label: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    onFocusChange?: (isFocused: boolean) => void;
}

export interface AuthFooterProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    linkText?: string;
    text?: string;
}

export interface AuthHeaderProps {
    title: string,
    description?: string
}

export interface ContinueWithButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon: React.ReactNode;
}
export interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> { }