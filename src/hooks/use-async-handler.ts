import { useState } from "react";

interface RunOptions<T> {
    onSuccess?: (result: T) => void;
    onError?: (message: string) => void;
}

export function useAsyncHandler() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const run = async <T>(
        action: () => Promise<T>,
        { onSuccess, onError }: RunOptions<T> = {}
    ) => {
        setIsLoading(true);
        setError("");
        try {
            const result = await action();
            onSuccess?.(result);
        } catch (err: any) {
            const message =
                err?.response?.data?.message || "Something went wrong! Please try again.";
            setError(message);
            onError?.(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { run, isLoading, error, setError };
}
