
import "./step.css"
import { cn } from "@/lib/utils/cn";
import React, { createContext, ReactElement, useContext } from "react";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> { }

type Step = {
    key: string;
    label: string;
};

type StepContextType = {
    steps: Step[];
    activeIndex: number;
};

interface StepProviderProps extends StepProps {
    steps: Step[];
    step: string;
};
interface StepItemProps extends StepProps {
    index?: number;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export function useStep() {
    const context = useContext(StepContext);
    if (!context) throw new Error("useStep must be used within StepIndicator");
    return context;
}

interface CheckProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}
const Check = ({ size = 16, ...props }: CheckProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={size}
            height={size}
            fill="currentColor"
            {...props}
        >
            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
        </svg>
    )
}

export function StepProvider({ steps, step, children, className, ...props }: StepProviderProps) {
    const activeIndex = steps.findIndex((s) => s.key === step);

    return (
        <StepContext.Provider value={{ steps, activeIndex }}>
            <div
                className={cn(
                    "flex items-center mb-6 justify-between mx-auto flex-wrap",
                    className || "w-full"
                )}
                {...props}
            >
                {steps.map((s, idx) => {
                    return (
                        <React.Fragment key={s.key}>
                            <div className="relative flex flex-col items-center">
                                {React.Children.map(children, (child) => {
                                    if (!React.isValidElement(child)) return child;
                                    return React.cloneElement(child as ReactElement<any>, { index: idx });
                                })}
                            </div>
                            {idx < steps.length - 1 && <StepLine index={idx} />}
                        </React.Fragment>

                    );
                })}
            </div>
        </StepContext.Provider>
    );
}
export function StepCircle({ index = 0, className, ...props }: StepItemProps) {
    const { activeIndex } = useStep();
    const isCompleted = index < activeIndex;
    const isActive = index === activeIndex;
    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-in-out",
                className ? className : "size-8",
                isActive
                    ? "bg-[var(--primary-color)] text-white scale-105"
                    : isCompleted
                        ? "bg-[var(--primary-color)]/30 text-[var(--primary-color)]"
                        : "bg-gray-200 text-gray-500"
            )}
            {...props}
        >
            {isCompleted ? <Check size={16} /> : index + 1}
        </div>
    )
}
export function StepLabel({ index = 0, className, ...props }: StepItemProps) {
    const { steps, activeIndex } = useStep();
    const step = steps[index];
    const isCompleted = index < activeIndex;
    const isActive = index === activeIndex;
    return (
        <span
            className={cn(
                "absolute top-full mt-1 text-[.8125rem] leading-[1.38462] font-medium text-center transition-colors duration-300",
                className ? className : "break-words",
                isActive ? "text-[var(--primary-color)]"
                    : isCompleted
                        ? "text-[var(--primary-color)]/70"
                        : "text-gray-500"
            )}
            {...props}
        >
            {step.label}
        </span>
    )
}

function StepLine({ index = 0, className, ...props }: StepItemProps) {
    const { activeIndex } = useStep();
    const isCompleted = index < activeIndex;

    return (
        <div
            className={cn(
                "flex-1 mx-2 transition-colors duration-500 bg-gray-300",
                className ? className : "h-[.125rem]",
                isCompleted
                    ? "progress before:bg-[var(--primary-color)]/30"
                    : ""
            )}
            {...props}
        />
    );
}