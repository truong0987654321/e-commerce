
import "./step.css"
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";
import React, { createContext, ReactElement, useContext } from "react";

export interface StepProps {
    className?: string;
    children?: React.ReactNode;
}

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

export function StepProvider({ steps, step, children, className }: StepProviderProps) {
    const activeIndex = steps.findIndex((s) => s.key === step);

    return (
        <StepContext.Provider value={{ steps, activeIndex }}>
            <div
                className={cn(
                    "flex items-center mb-6 justify-between mx-auto flex-wrap",
                    className || "w-full"
                )}
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
export function StepCircle({ index = 0, className }: StepItemProps) {
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
        >
            {isCompleted ? <Check size={16} /> : index + 1}
        </div>
    )
}
export function StepLabel({ index = 0, className }: StepItemProps) {
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
        >
            {step.label}
        </span>
    )
}

function StepLine({ index = 0, className }: StepItemProps) {
    const { activeIndex } = useStep();
    const isCompleted = index < activeIndex;

    return (
        <div
            className={cn(
                "h-[.125rem] flex-1 mx-2 transition-colors duration-500",
                className ? className : "",
                isCompleted
                    ? "bg-[var(--primary-color)]/30"
                    : "bg-gray-300"
            )}
        />
    );
}