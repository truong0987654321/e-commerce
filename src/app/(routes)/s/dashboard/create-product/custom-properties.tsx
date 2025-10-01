"use client";

import React, { useEffect, useState } from "react";

interface SubPropertyProps {
    id: string;
    label: string;
    onRemove: (id: string) => void;
    onChange: (id: string, values: string[]) => void;
}

const SubProperty = ({ id, label, onRemove, onChange }: SubPropertyProps) => {
    const [value, setValue] = useState("");
    const [list, setList] = useState<string[]>([]);

    const handleAdd = () => {
        if (value.trim() === "") return;
        const updated = [...list, value];
        setList(updated);
        onChange(id, updated); // báo về cha
        setValue("");
    };

    const handleRemoveItem = (idx: number) => {
        const updated = list.filter((_, i) => i !== idx);
        setList(updated);
        onChange(id, updated); // báo về cha
    };

    return (
        <div className="mt-3 p-3 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{label}</h3>
                <button
                    onClick={() => onRemove(id)}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                    ✕ Remove
                </button>
            </div>

            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1 border px-3 py-2 rounded-lg text-sm focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Add
                </button>
            </div>

            <div className="space-y-1">
                {list.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center px-3 py-1 bg-white border rounded-md text-sm"
                    >
                        <span>{item}</span>
                        <button
                            onClick={() => handleRemoveItem(idx)}
                            className="text-red-500 text-xs hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
interface SubPropertyData {
    id: string;
    label: string;
    values: string[];
}
interface CustomPropertiesProps {
    onChange?: (data: SubPropertyData[]) => void;
}

export const CustomProperties = ({ onChange }: CustomPropertiesProps) => {
    const [label, setLabel] = useState("");
    const [subProps, setSubProps] = useState<SubPropertyData[]>([]);

    const handleAddSubProperty = () => {
        if (label.trim() === "") return;
        const newSubProp: SubPropertyData = {
            id: crypto.randomUUID(),
            label,
            values: [],
        };
        setSubProps([...subProps, newSubProp]);
        setLabel("");
    };

    const handleRemoveSubProperty = (id: string) => {
        const updated = subProps.filter((sp) => sp.id !== id);
        setSubProps(updated);
    };

    const handleChangeValues = (id: string, values: string[]) => {
        const updated = subProps.map((sp) =>
            sp.id === id ? { ...sp, values } : sp
        );
        setSubProps(updated);
    };

    // mỗi khi subProps thay đổi thì gọi onChange
    useEffect(() => {
        if (onChange) onChange(subProps);
    }, [subProps, onChange]);

    return (
        <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-4">Custom Properties</h2>

            {/* Input 1 */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Enter property name"
                    className="flex-1 border px-3 py-2 rounded-lg text-sm focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleAddSubProperty}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* Các component con */}
            <div className="space-y-4">
                {subProps.map((item) => (
                    <SubProperty
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        onRemove={handleRemoveSubProperty}
                        onChange={handleChangeValues}
                    />
                ))}
            </div>
        </div>
    );
};

