import { cn } from "@/lib/utils/cn";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip/tooltip";

type EllipsisTooltipProps = React.HTMLAttributes<HTMLDivElement>

export const EllipsisTooltip = ({ children, className, ...props }: EllipsisTooltipProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            setIsOverflow(el.scrollWidth > el.clientWidth);
        }
    }, [children]);

    return (
        <div
            ref={ref}
            className={cn(
                "truncate",
                className ? className : "w-80 ",
            )}
            {...props}
        >
            {isOverflow ? (
                <Tooltip tooltipPosition="right">
                    <TooltipTrigger>{children}</TooltipTrigger>
                    <TooltipContent>{children}</TooltipContent>
                </Tooltip>
            ) : (
                children
            )}
        </div>
    );
}
