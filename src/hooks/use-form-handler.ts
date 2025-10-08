import { useState } from "react";

export function useFormHandler<T extends Record<string, any>>(initialState: T) {
    const [form, setForm] = useState<T>(initialState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => setForm(initialState);

    return { form, setForm, handleChange, resetForm };
}
