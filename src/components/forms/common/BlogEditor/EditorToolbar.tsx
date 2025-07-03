"use client";

import { Editor } from "@tiptap/core";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Code,
    Heading1,
    Heading2,
    Heading3,
} from "lucide-react";

export default function EditorToolbar({
    editor,
    isUploading,
    openImageUpload,
    setLink,
}: {
    editor: Editor;
    isUploading: boolean;
    openImageUpload: () => void;
    setLink: () => void;
}) {
    return (
        <div className="flex items-center gap-1 p-3 border-b border-gray-2 text-gray-5">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
                }`}
                title="제목 1"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
                }`}
                title="제목 2"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
                }`}
                title="제목 3"
            >
                <Heading3 className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("bold") ? "bg-gray-200" : ""
                }`}
                title="굵게"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("italic") ? "bg-gray-200" : ""
                }`}
                title="기울임"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("code") ? "bg-gray-200" : ""
                }`}
                title="코드"
            >
                <Code className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("bulletList") ? "bg-gray-200" : ""
                }`}
                title="글머리 기호"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("orderedList") ? "bg-gray-200" : ""
                }`}
                title="번호 매기기"
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("blockquote") ? "bg-gray-200" : ""
                }`}
                title="인용"
            >
                <Quote className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={setLink}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive("link") ? "bg-gray-200" : ""
                }`}
                title="링크"
            >
                <LinkIcon className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={openImageUpload}
                className="p-2 rounded hover:bg-gray-200 transition-colors relative"
                title="이미지 업로드"
                disabled={isUploading}
            >
                <ImageIcon className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="실행 취소"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="다시 실행"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
}
