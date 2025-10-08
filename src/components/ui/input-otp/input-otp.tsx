import "./input-otp.css"

import React, { useContext, createContext, useState, useRef } from "react";
import { cn } from "@/lib/utils/cn";

type BaseInputOTPProps = React.HTMLAttributes<HTMLDivElement>;

interface InputOTPProps extends Omit<BaseInputOTPProps, "onChange"> {
  value?: InputOTPContextType;
  maxLength: number;
  onChange?: (otp: string) => void;
}

interface InputOTPSlotProps extends BaseInputOTPProps {
  index: number;
}

interface InputOTPContextType {
  slots: { char: string; hasFakeCaret: boolean; isActive: boolean }[];
  handleChange: (value: string) => void;
  maxLength: number;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

const InputOTPContext = createContext<InputOTPContextType | null>(null);

export const InputOTP = ({ children, maxLength = 6, className, onChange, ...props }: InputOTPProps) => {
  const [otp, setOtp] = useState<string[]>(Array(maxLength).fill(""));
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {

    const chars = value.split("").slice(0, maxLength);
    while (chars.length < maxLength) {
      chars.push("");
    }
    setOtp(chars);
    onChange?.(chars.join(""));
  };

  const emptyIndex = otp.findIndex((char) => char === "");
  const hasMaxLength = emptyIndex === -1;
  const slots = otp.map((char, index) => ({
    char,
    hasFakeCaret: isFocused && !hasMaxLength && emptyIndex === index,
    isActive: isFocused && (hasMaxLength ? index === maxLength - 1 : emptyIndex === index),
  }));

  return (
    <InputOTPContext.Provider value={{ slots, handleChange, maxLength, isFocused, setIsFocused }}>
      <div
        className={cn(
          "flex items-center gap-2 select-none relative",
          className ? className : ''
        )}
        onClick={() => inputRef.current?.focus()}
        {...props}
      >
        {children}
        <input
          ref={inputRef}
          type="text"
          value={otp.join("")}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute opacity-0 w-[calc(100%+2.5rem)] h-full inset-[0rem_2.5rem_0rem_0rem]"
          maxLength={maxLength}
        />
      </div>
    </InputOTPContext.Provider>
  );
};

export const InputOTPGroup = ({ children, ...props }: BaseInputOTPProps) => {
  return <div className="flex items-center" {...props}>{children}</div>;
};

export const InputOTPSlot = ({ index, className }: InputOTPSlotProps) => {
  const inputOTPContext = useContext(InputOTPContext);
  if (!inputOTPContext) {
    throw new Error("InputOTPSlot must be used within an InputOTP");
  }

  const { slots, maxLength } = inputOTPContext;
  const { char, hasFakeCaret, isActive } = slots[index] || { char: "", hasFakeCaret: false, isActive: false };
  if (index >= maxLength) {
    console.error(`Error: InputOTPSlot index (${index}) exceeds maxLength (${maxLength})`);
  }
  return (
    <div
      className={`relative flex h-9 w-9 items-center justify-center outline-0 border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md  ${isActive ? " z-10 ring-1 ring-[var(--color-input-otp-ring)]" : ""}${className ? ` ${className}` : ''}`}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-[var(--color-input-otp-cursor)] duration-1000" />
        </div>
      )}
    </div>
  );
};
