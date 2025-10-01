"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Spec {
    name: string;
    value: string;
}

interface CustomSpecificationsProps {
    onChange?: (specs: Spec[]) => void;
}

export const CustomSpecifications = ({ onChange }: CustomSpecificationsProps) => {
    const [specs, setSpecs] = useState<Spec[]>([]);

    const handleAddSpec = () => {
        setSpecs([...specs, { name: "", value: "" }]);
    };

    const handleChange = (index: number, field: "name" | "value", newValue: string) => {
        const updatedSpecs = [...specs];
        updatedSpecs[index][field] = newValue;
        setSpecs(updatedSpecs);
    };
    const handleRemoveSpec = (index: number) => {
        const updatedSpecs = specs.filter((_, i) => i !== index);
        setSpecs(updatedSpecs);
    };
    // Mỗi khi specs thay đổi thì gọi callback cho component cha
    useEffect(() => {
        if (onChange) {
            onChange(specs);
        }
    }, [specs, onChange]);

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Custom Specifications</h2>

            {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-4 mb-3 relative">
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600">Specifications Name</label>
                        <input
                            type="text"
                            value={spec.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600">Value</label>
                        <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleChange(index, "value", e.target.value)}
                            className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                            placeholder="Enter value"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => handleRemoveSpec(index)}
                            className="px-2 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={handleAddSpec}
                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
                + Add Specification
            </button>
        </>
    );
};

export default CustomSpecifications;
