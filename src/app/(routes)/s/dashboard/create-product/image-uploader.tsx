"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { ImagePlus, X } from "lucide-react";

interface ImageUploaderProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({ images, setImages }: ImageUploaderProps) {
    const [warning, setWarning] = useState("");
    const [isInvalidFile, setIsInvalidFile] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const warningNotImage = "Invalid file. Only image files are allowed."
    const warningDuplicate = "This image already exists.";

    const handleImageLoad = (src: string) => {
        queueMicrotask(() => {
            setImageLoadedMap((prev) => ({ ...prev, [src]: true }));
        });
    };

    const handleFiles = useCallback((files: FileList) => {
        setIsInvalidFile(false);
        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) {
                setIsInvalidFile(true);
                setWarning(warningNotImage);
                return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    setTimeout(() => {
                        let isDuplicate = false;
                        setImages((prev) => {
                            if (prev.find((f) => f.name === file.name && f.size === file.size)) {
                                isDuplicate = true;
                                return prev;
                            }
                            return [...prev, file];
                        });

                        if (isDuplicate) {
                            setWarning(warningDuplicate);
                        } else {
                            setWarning("");
                        }
                    }, 0);
                }
            };


            reader.readAsDataURL(file);
        });
    }, [setImages, warningNotImage, warningDuplicate]);

    const handleRemoveImage = (fileToRemove: File) => {
        setImages(images.filter((f) => f !== fileToRemove));
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const { clientX: x, clientY: y } = e;
        if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
            setIsDragOver(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleClickSelectFile = () => {
        fileInputRef.current?.click();
    };

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = "";
        }
    };

    useEffect(() => {
        const handleWindowDragOver = (e: DragEvent) => {
            if (e.dataTransfer?.types.includes("Files")) e.preventDefault();
        };

        const handleWindowDrop = (e: DragEvent) => {
            if (e.dataTransfer?.types.includes("Files")) e.preventDefault();
        };

        window.addEventListener("dragover", handleWindowDragOver);
        window.addEventListener("drop", handleWindowDrop);

        return () => {
            window.removeEventListener("dragover", handleWindowDragOver);
            window.removeEventListener("drop", handleWindowDrop);
        };
    }, []);
    const imageURLs = useMemo(() => {
        return images.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
    }, [images]);
    return (
        <>
            <h4 className="font-bold mb-4">Create Product</h4>
            <div className="relative border-0 rounded-lg min-h-[auto] p-0">
                <div className="flex flex-wrap">
                    {imageURLs.map(({ file, url }) => (
                        <div
                            key={file.name + file.size}
                            className="flex items-center justify-center relative cursor-default border border-solid border-[#cbd0dd] mr-2 mb-2 bg-white rounded-lg"
                            style={{ height: "5rem", width: "5rem" }}
                        >
                            <Image
                                loading="lazy"
                                src={url}
                                alt="Uploaded image"
                                fill
                                onLoad={() => handleImageLoad(url)}
                                className={cn(
                                    "block h-8 w-8 object-cover overflow-hidden relative z-10 cursor-default rounded-[inherit]",
                                    imageLoadedMap[url] ? "" : "pulse cell"
                                )}
                            />
                            <button
                                onClick={() => handleRemoveImage(file)}
                                className="absolute flex items-center justify-center right-[-.25rem] top-[-.25rem] text-[rgba(138,148,173)] z-50 w-7 h-7 text-sm hover:text-[#3e3f41]"
                            >
                                <X className="size-4 bg-white cursor-pointer rounded-full hover:bg-[#ebe5e5] p-[2px]" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-9 cursor-pointer">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onClick={handleClickSelectFile}
                        className={cn(
                            "flex flex-col items-center justify-center p-12 border border-dashed rounded-lg text-[rgba(82,91,117)] bg-[var(--color-sidebar-bg-2)] border-[#cbd0dd] hover:bg-[#f5f7fa]",
                            isDragOver ? "border-blue-500 bg-blue-50" : "",
                            isInvalidFile ? "border-red-500 bg-red-100" : ""
                        )}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleSelectFiles}
                        />
                        <div className="flex items-center">
                            Drag your photo here<span className="px-1">or</span>
                            <button
                                className="text-[#003cc7] hover:underline"
                            >
                                Browse from device
                            </button>
                        </div>
                        <span className="w-10 h-10 mt-3 mr-3 text-[2.5rem]">

                            <ImagePlus />
                        </span>
                    </div>
                    {warning && (
                        <p className="text-red-500 mb-2">{warning}</p>
                    )}
                </div>

            </div>
        </>
    );
}
