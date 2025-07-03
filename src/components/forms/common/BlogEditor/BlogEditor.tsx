"use client";

import { useEditor } from "@tiptap/react";
import { useField } from "formik";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useRef, useState } from "react";
import { useImageUpload } from "./hooks/useImageUpload";
import { ImageExt } from "./extensions/ImageComponent";
import EditorToolbar from "./EditorToolbar";
import EditorContentArea from "./EditorContentArea";
import { upload_to_s3 } from "@/lib/api/endpoints/s3";

export default function BlogEditor({
    name,
    placeholder = "내용을 입력하세요.",
}: {
    name: string;
    placeholder?: string;
}) {
    const [field, meta, helpers] = useField(name);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingFileName, setUploadingFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropHandledRef = useRef<boolean>(false);
    const { handleImageFile, isUploading, uploadProgress } = useImageUpload(upload_to_s3);

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExt.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: { class: "max-w-full h-auto" },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: "text-orange-main underline" },
            }),
            Placeholder.configure({ placeholder }),
        ],
        content: field.value || "",
        onUpdate: ({ editor }) => {
            helpers.setValue(editor.getHTML());
            helpers.setTouched(true);
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[400px] px-7 py-4 focus:outline-none",
            },
            handleDrop(view, event, slice, moved) {
                if (!moved && event.dataTransfer && event.dataTransfer.files.length) {
                    const files = Array.from(event.dataTransfer.files).filter((f) =>
                        f.type.startsWith("image/")
                    );
                    if (files.length) {
                        event.preventDefault();
                        dropHandledRef.current = true;
                        const pos = view.posAtCoords({
                            left: event.clientX,
                            top: event.clientY,
                        })?.pos;
                        if (editor) handleImageDrop(files, pos);
                        setTimeout(() => {
                            dropHandledRef.current = false;
                        }, 100);
                        setIsDragging(false);
                        return true;
                    }
                }
                return false;
            },
            handlePaste(view, event) {
                if (event.clipboardData && event.clipboardData.files.length) {
                    event.preventDefault();
                    const files = Array.from(event.clipboardData.files).filter((f) =>
                        f.type.startsWith("image/")
                    );
                    if (files.length && editor) {
                        handleImageDrop(files, view.state.selection.from);
                        return true;
                    }
                }
                return false;
            },
        },
    });

    const handleDragOver = useCallback((e: React.DragEvent) => {
        if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
            setIsDragging(true);
        }
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
            setIsDragging(false);
        }
    }, []);

    const handleImageDrop = useCallback(
        async (files: File[], position?: number) => {
            if (!editor) return;
            for (const file of files) {
                setUploadingFileName(file.name);
                try {
                    const { url, width, height } = await handleImageFile(file);
                    let w = width;
                    let h = height;
                    if (width > 600) {
                        h = Math.round((600 / width) * height);
                        w = 600;
                    }
                    const attrs = {
                        src: url,
                        width: w,
                        height: h,
                        alt: file.name.replace(/\.[^/.]+$/, ""),
                        title: file.name,
                    };
                    const chain = editor.chain().focus();
                    if (position != null) chain.insertContentAt(position, { type: "image", attrs });
                    else chain.setImage(attrs);
                    chain.run();
                } catch (err) {
                    alert(
                        err instanceof Error ? err.message : "이미지 업로드 중 오류가 발생했습니다."
                    );
                } finally {
                    setUploadingFileName(null);
                }
            }
        },
        [editor, handleImageFile]
    );

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            if (files.length) handleImageDrop(files);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        [handleImageDrop]
    );

    const openImageUpload = () => fileInputRef.current?.click();
    const setLink = () => {
        if (!editor) return;
        const prev = editor.getAttributes("link").href || "";
        const url = window.prompt("링크 URL을 입력하세요:", prev);
        if (url == null) return;
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    if (!editor) return null;

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
            />

            <div
                className={`border rounded-[10px] overflow-hidden focus-within:ring-1 focus-within:ring-orange-main transition-all duration-200 ${
                    isDragging ? "border-orange-main bg-orange-50" : "border-gray-2"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                    if (e.dataTransfer && e.dataTransfer.files.length && !dropHandledRef.current) {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files).filter((f) =>
                            f.type.startsWith("image/")
                        );
                        if (files.length) handleImageDrop(files);
                    }
                    setIsDragging(false);
                }}
            >
                <EditorToolbar
                    editor={editor}
                    isUploading={isUploading}
                    openImageUpload={openImageUpload}
                    setLink={setLink}
                />

                <EditorContentArea
                    editor={editor}
                    isDragging={isDragging}
                    uploadingFileName={uploadingFileName}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                />
            </div>

            {meta.touched && meta.error && (
                <p className="body5_r text-red-500 mt-2.5">{meta.error}</p>
            )}
        </div>
    );
}
