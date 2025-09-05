
export interface BaseInputOTPProps {
    children?: React.ReactNode;
    className?: string;
}

export interface InputOTPProps extends BaseInputOTPProps {
    value?: InputOTPContextType;
    maxLength: number;
    onChange?: (otp: string) => void;
}

export interface InputOTPSlotProps extends BaseInputOTPProps {
    index: number;
}

export interface InputOTPContextType {
    slots: { char: string; hasFakeCaret: boolean; isActive: boolean }[];
    handleChange: (value: string) => void;
    maxLength: number;
    isFocused: boolean;
    setIsFocused: (focused: boolean) => void;
}