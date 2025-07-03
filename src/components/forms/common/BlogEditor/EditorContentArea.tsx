"use client";

import { Editor, EditorContent } from "@tiptap/react";
import { Upload, LoaderCircle } from "lucide-react";

export default function EditorContentArea({
    editor,
    isDragging,
    uploadingFileName,
    isUploading,
    uploadProgress,
}: {
    editor: Editor;
    isDragging: boolean;
    uploadingFileName: string | null;
    isUploading: boolean;
    uploadProgress: number;
}) {
    return (
        <div className="relative">
            <EditorContent editor={editor} className="min-h-[400px] bg-white" />
            {isDragging && (
                <div className="absolute inset-0 bg-orange-light-1 bg-opacity-80 flex items-center justify-center pointer-events-none">
                    <Upload className="w-12 h-12 text-orange-main mx-auto mb-2" />
                </div>
            )}
            {isUploading && uploadingFileName && (
                <div className="flex items-center text-sm text-gray-5 my-2 px-7">
                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                    <span>
                        업로드 중({uploadingFileName})... {Math.round(uploadProgress)}%
                    </span>
                </div>
            )}
        </div>
    );
}
