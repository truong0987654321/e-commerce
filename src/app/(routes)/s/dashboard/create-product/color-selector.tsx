import { useState } from "react";

const defaultColors = [
    "#000000", // black
    "#ffffff", // white
    "#ff0000", // red
    "#00ff00", // green
    "#0000ff", // blue
    "#ffff00", // yellow
    "#ff00ff", // magenta
    "#00ffff", // cyan
];

interface ColorSelectorProps {
    value: string;
    onChange: (color: string) => void;
}

export const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
    const [customColors, setCustomColors] = useState<string[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [newColor, setNewColor] = useState("#ffffff");

    const handleAddCustomColor = () => {
        if (![...defaultColors, ...customColors].includes(newColor)) {
            setCustomColors([...customColors, newColor]);
        }
        onChange(newColor);
        setShowColorPicker(false);
    };

    return (
        <div className="mt-2">
            <label className="block font-medium text-gray-700 mb-1">Colors</label>

            {/* danh sách màu */}
            <div className="flex flex-wrap gap-2 mb-3">
                {[...defaultColors, ...customColors].map((color, index) => (
                    <button
                        key={color + "-" + index}
                        className={`w-8 h-8 rounded border-2 ${value === color ? "border-blue-500" : "border-gray-300"
                            }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                        type="button"
                    />
                ))}

                {/* nút mở picker */}
                <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-8 h-8 rounded border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-sm"
                >
                    +
                </button>
            </div>

            {showColorPicker && (
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleAddCustomColor}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};
