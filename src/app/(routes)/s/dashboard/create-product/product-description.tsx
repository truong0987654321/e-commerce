"use client"

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils/cn";
import { BoldIcon, ItalicIcon, ListIcon, ListOrdered, Redo, UnderlineIcon, Undo } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { Button } from "@/components/ui/element/button";

interface Props {
    onChange?: (value: string) => void;
    initialContent?: string;
}

export const ProductDescription = ({ onChange, initialContent }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: initialContent || "",
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        editorProps: {
            attributes: {
                style: `padding-left: 5px; padding-right: 5px;`,
                class:
                    "focus:outline-none focus:border-[#3874ff] print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[15rem] cursor-text",
            },
        },
        immediatelyRender: false,
    });
    const history = [
        {
            label: "Undo",
            icon: Undo,
            onClick: () => editor?.chain().focus().undo().run(),
            isActive: () => editor?.can().undo() ?? false,
        },
        {
            label: "Redo",
            icon: Redo,
            onClick: () => editor?.chain().focus().redo().run(),
            isActive: () => editor?.can().redo() ?? false,
        },
    ]
    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrdered,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ];
    const sections = [
        {
            label: "Bold",
            icon: BoldIcon,
            isActive: editor?.isActive("bold"),
            onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
            label: "Italic",
            icon: ItalicIcon,
            isActive: editor?.isActive("italic"),
            onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            isActive: editor?.isActive("underline"),
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
    ]


    if (!editor) return null;
    return (
        <div className="border rounded p-2">

            {/* Toolbar */}
            <div className="flex gap-2 mb-2 flex-wrap items-center">
                {history.map(({ label, icon: Icon, onClick, isActive }) => (
                    <Tooltip
                        key={label}
                    >
                        <TooltipTrigger>
                            <Button
                                onClick={onClick}
                                className={cn(
                                    " hover:bg-neutral-200/80 px-1 h-7",
                                )}
                                disabled={!isActive()}
                            >
                                <Icon className="size-4" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm">{label}</span>
                        </TooltipContent>
                    </Tooltip>
                ))}
                <div className="shrink-0 w-[1px] h-6 bg-neutral-300"></div>
                {sections.map(({ label, icon: Icon, onClick, isActive }) => (
                    <Tooltip
                        key={label}
                    >
                        <TooltipTrigger>
                            <Button
                                onClick={onClick}
                                className={cn(
                                    " hover:bg-neutral-200/80 px-1 h-7",
                                    isActive && "bg-neutral-200/80",
                                )}
                            >
                                <Icon className="size-4" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm">{label}</span>
                        </TooltipContent>
                    </Tooltip>
                ))}
                <div className="shrink-0 w-[1px] h-6 bg-neutral-300"></div>
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <Tooltip
                        key={label}
                    >
                        <TooltipTrigger>
                            <Button
                                onClick={onClick}
                                className={cn(
                                    " hover:bg-neutral-200/80 px-1 h-7",
                                    isActive() && "bg-neutral-200/80",
                                )}
                            >
                                <Icon className="size-4" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm">{label}</span>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>

            {/* Editor content */}
            <EditorContent editor={editor} />
        </div>
    )
}
