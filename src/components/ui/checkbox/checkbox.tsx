
import { cn } from "@/lib/utils/cn";
import "./checkbox.css";

interface CheckboxProps {
    id?: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ id, checked, onClick, onChange }: CheckboxProps) => {
    return (
        <div
            className={cn(
                "checkbox inline-flex relative flex-auto w-[1.125rem] h-[1.125rem] box-content p-[11px] leading-[0] whitespace-nowrap align-bottom",
                checked ? "checkbox-checked" : ""
            )}
        >
            <label className="block">
                <input
                    id={id}
                    checked={checked}
                    onClick={onClick}
                    onChange={(e) => onChange(e.target.checked)}
                    type="checkbox" className="absolute m-0 p-0 z-[1] w-10 h-10 top-0 left-0 right-0 opacity-0 cursor-pointer" />
                <div
                    className={cn(
                        "inline-flex items-center justify-center absolute w-[1.125rem] h-[1.125rem] border-2 border-solid rounded-[2px] will-change-[background-color,border-color] transition-[background-color_90ms_cubic-bezier(.4,0,.6,1),border-color_90ms_cubic-bezier(.4,0,.6,1)] top-[11px] left-[11px]",
                        checked ? "bg-[var(--color-checkbox-bg)] border-[var(--color-checkbox-bg)]" : "bg-[rgba(0,0,0,0)] border-current"
                    )}
                >
                    <svg
                        className={cn(
                            "absolute inset-0 w-full text-[var(--color-checkbox-icon)]",
                            checked ? "opacity-100 transition-[opacity_180ms_cubic-bezier(0,0,.2,1),transform_180ms_cubic-bezier(0,0,.2,1)]" : "opacity-0 transition-[opacity_180ms_cubic-bezier(.4,0,.6,1)]"
                        )}
                        viewBox="0 0 24 24"
                    >
                        <path className="transition-[stroke-dashoffset_180ms_cubic-bezier(.4,0,.6,1)] stroke-current stroke-[3.12px]" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" ></path>
                    </svg>
                </div>
            </label>
            <div className="checkbox_ripple" />
        </div>
    )
}