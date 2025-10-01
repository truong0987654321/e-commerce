// src/components/SizeSelector.tsx
"use client";
import { useEffect, useState } from "react";

type SizeSelectorProps = {
    onChange?: (sizes: string[]) => void;
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export const SizeSelector = ({ onChange }: SizeSelectorProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (size: string) => {
        setSelected((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    // 🔹 gọi onChange khi selected thay đổi
    useEffect(() => {
        if (onChange) onChange(selected);
    }, [selected, onChange]);


    return (
        <div className="flex gap-2">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => handleToggle(size)}
                    className={`px-4 py-2 border rounded 
            ${selected.includes(size) ? "bg-black text-white" : "bg-white text-black"}
          `}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}
