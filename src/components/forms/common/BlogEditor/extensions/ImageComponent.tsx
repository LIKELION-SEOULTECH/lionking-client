import { useCallback, useEffect, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import ImageExtension from "@tiptap/extension-image";
import { Move } from "lucide-react";

const ResizableImageComponent = ({ node, updateAttributes, selected }: NodeViewProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [showAltInput, setShowAltInput] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const altInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showAltInput && altInputRef.current) altInputRef.current.focus();
    }, [showAltInput]);

    const handleResize = useCallback(
        (e: React.MouseEvent, direction: string) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = node.attrs.width || imageRef.current?.offsetWidth || 0;
            const startHeight = node.attrs.height || imageRef.current?.offsetHeight || 0;
            const aspectRatio = startWidth / startHeight;

            const handleMouseMove = (e: MouseEvent) => {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                let newWidth = startWidth;
                let newHeight = startHeight;
                if (direction.includes("right")) newWidth = startWidth + deltaX;
                if (direction.includes("left")) newWidth = startWidth - deltaX;
                if (direction.includes("bottom")) newHeight = startHeight + deltaY;
                if (direction.includes("top")) newHeight = startHeight - deltaY;
                if (e.shiftKey) {
                    if (direction === "right" || direction === "left")
                        newHeight = newWidth / aspectRatio;
                    else newWidth = newHeight * aspectRatio;
                }
                newWidth = Math.max(100, newWidth);
                newHeight = Math.max(100, newHeight);
                updateAttributes({ width: Math.round(newWidth), height: Math.round(newHeight) });
            };

            const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            setIsResizing(true);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [node.attrs.width, node.attrs.height, updateAttributes]
    );

    const handleAltTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowAltInput(false);
    };

    return (
        <NodeViewWrapper className="relative inline-block my-4" draggable data-drag-handle>
            <div
                className={`relative inline-block group ${
                    selected ? "ring-2 ring-orange-main" : ""
                }`}
            >
                <img
                    ref={imageRef}
                    src={node.attrs.src}
                    alt={node.attrs.alt || ""}
                    title={node.attrs.title || ""}
                    width={node.attrs.width}
                    height={node.attrs.height}
                    className={`max-w-full h-auto rounded-lg ${
                        isResizing ? "pointer-events-none" : "cursor-move"
                    }`}
                    draggable={false}
                    loading="lazy"
                />
                {selected && (
                    <>
                        <div className="absolute -top-10 left-0 flex items-center gap-2 bg-white rounded-lg shadow-lg px-2 py-1">
                            <div className="flex items-center gap-1">
                                <Move className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600">드래그로 이동</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300" />
                            <button
                                onClick={() => setShowAltInput((s) => !s)}
                                className="text-xs text-gray-600 hover:text-orange-main flex items-center gap-1"
                                title="대체 텍스트 편집"
                            >
                                <span>Alt</span>
                            </button>
                        </div>
                        {showAltInput && (
                            <form
                                onSubmit={handleAltTextSubmit}
                                className="absolute -bottom-12 left-0 right-0 bg-white rounded-lg shadow-lg p-2"
                            >
                                <input
                                    ref={altInputRef}
                                    type="text"
                                    value={node.attrs.alt || ""}
                                    onChange={(e) => updateAttributes({ alt: e.target.value })}
                                    placeholder="이미지 설명 (대체 텍스트)"
                                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-orange-main"
                                />
                            </form>
                        )}
                        <div
                            className="absolute -top-1 -left-1 w-3 h-3 bg-orange-main rounded-full cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "top-left")}
                        />
                        <div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-orange-main rounded-full cursor-ne-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "top-right")}
                        />
                        <div
                            className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-main rounded-full cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "bottom-left")}
                        />
                        <div
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-main rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "bottom-right")}
                        />
                        <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-main rounded-full cursor-n-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "top")}
                        />
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-main rounded-full cursor-s-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "bottom")}
                        />
                        <div
                            className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 bg-orange-main rounded-full cursor-w-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "left")}
                        />
                        <div
                            className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-orange-main rounded-full cursor-e-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResize(e, "right")}
                        />
                    </>
                )}
            </div>
        </NodeViewWrapper>
    );
};

export const ImageExt = ImageExtension.extend({
    name: "image",
    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            title: { default: null },
            width: { default: null },
            height: { default: null },
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageComponent);
    },
});
