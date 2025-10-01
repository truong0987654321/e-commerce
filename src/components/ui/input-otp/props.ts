import React from "react";

export interface BaseInputOTPProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface InputOTPProps extends Omit<BaseInputOTPProps, "onChange"> {
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