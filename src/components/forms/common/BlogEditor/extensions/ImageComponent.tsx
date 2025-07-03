import { useCallback, useEffect, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import ImageExtension from "@tiptap/extension-image";
import { Move } from "lucide-react";

const MIN_WIDTH = 50;

const ResizableImageComponent = ({ node, updateAttributes, selected }: NodeViewProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [showAltInput, setShowAltInput] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const altInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showAltInput && altInputRef.current) altInputRef.current.focus();
    }, [showAltInput]);

    const naturalAspectRatioRef = useRef<number | null>(null);

    useEffect(() => {
        const img = imageRef.current;
        if (!img || naturalAspectRatioRef.current) return;

        const onLoad = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            naturalAspectRatioRef.current = ratio;

            queueMicrotask(() => {
                updateAttributes({
                    width: img.offsetWidth,
                    height: Math.round(img.offsetWidth / ratio),
                });
            });
        };

        if (img.complete && img.naturalWidth && img.naturalHeight) {
            onLoad();
        } else {
            img.addEventListener("load", onLoad);
            return () => img.removeEventListener("load", onLoad);
        }
    }, [updateAttributes]);

    const handleResize = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startWidth = node.attrs.width || imageRef.current?.offsetWidth || 0;
            const aspectRatio = naturalAspectRatioRef.current || 1.5;

            const onMouseMove = (e: MouseEvent) => {
                const deltaX = e.clientX - startX;
                let newWidth = startWidth + deltaX;

                newWidth = Math.max(MIN_WIDTH, newWidth);
                const newHeight = Math.round(newWidth / aspectRatio);

                updateAttributes({ width: Math.round(newWidth), height: newHeight });
            };

            const onMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            setIsResizing(true);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        },
        [node.attrs.width, updateAttributes]
    );

    const handleAltTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowAltInput(false);
    };

    const width = node.attrs.width || 300;
    const height = node.attrs.height || Math.round(width / (naturalAspectRatioRef.current || 1.5));

    const handleSize = Math.max(8, width * 0.04);

    return (
        <NodeViewWrapper className="inline-block align-bottom my-1" draggable data-drag-handle>
            <div
                className={`relative group ${selected ? "ring-2 ring-orange-main" : ""}`}
                style={{ width, aspectRatio: `${width} / ${height}` }}
            >
                <img
                    ref={imageRef}
                    src={node.attrs.src}
                    alt={node.attrs.alt || ""}
                    title={node.attrs.title || ""}
                    className={`w-full h-auto rounded-lg ${
                        isResizing ? "pointer-events-none" : "cursor-move"
                    }`}
                    draggable={false}
                    loading="lazy"
                />

                {selected && (
                    <>
                        <div className="absolute -top-10 left-0 flex items-center gap-2 bg-white rounded-lg shadow px-2 py-1 z-10">
                            <Move className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-600">드래그로 이동</span>
                            <div className="w-px h-4 bg-gray-300 mx-2" />
                            <button
                                onClick={() => setShowAltInput((s) => !s)}
                                className="text-xs text-gray-600 hover:text-orange-main"
                                title="대체 텍스트 편집"
                            >
                                Alt
                            </button>
                        </div>

                        {showAltInput && (
                            <form
                                onSubmit={handleAltTextSubmit}
                                className="absolute -bottom-12 left-0 right-0 bg-white rounded-lg shadow p-2 z-10"
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
                            className="absolute bg-orange-main rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
                            onMouseDown={handleResize}
                            style={{
                                width: `${handleSize}px`,
                                height: `${handleSize}px`,
                                bottom: `-${handleSize / 2}px`,
                                right: `-${handleSize / 2}px`,
                                zIndex: 20,
                            }}
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
