import { useState, useRef, useCallback } from "react";
import { useField } from "formik";
import { Upload, X, Grid3X3, Rows } from "lucide-react";

type LayoutMode = "full" | "grid";

export default function ImageDropZone({
    name,
    multiple = false,
    maxFiles = 1,
    accept = "image/*",
    defaultLayout = "grid",
}: {
    name: string;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    defaultLayout?: LayoutMode;
}) {
    const [field, meta, helpers] = useField<string | string[]>(name);
    const [isDragging, setIsDragging] = useState(false);
    const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
    const fileInputRef = useRef<HTMLInputElement>(null);

    let images: string[] = [];
    if (multiple) {
        images = (field.value as string[]) || [];
    } else if (field.value) {
        images = [field.value as string];
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    }, []);

    const handleFiles = (files: File[]) => {
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));

        if (!multiple && imageFiles.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                helpers.setValue(e.target?.result as string);
            };
            reader.readAsDataURL(imageFiles[0]);
        } else if (multiple) {
            const currentImages = (field.value as string[]) || [];
            const remainingSlots = maxFiles - currentImages.length;
            const filesToProcess = imageFiles.slice(0, remainingSlots);

            Promise.all(
                filesToProcess.map((file) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target?.result as string);
                        reader.readAsDataURL(file);
                    });
                })
            ).then((newImages) => {
                helpers.setValue([...currentImages, ...newImages]);
            });
        }
    };

    const removeImage = (index: number) => {
        if (multiple) {
            const newImages = [...(field.value as string[])];
            newImages.splice(index, 1);
            helpers.setValue(newImages);
        } else {
            helpers.setValue("");
        }
    };

    const canAddMore = multiple ? images.length < maxFiles : images.length === 0;

    return (
        <div className="w-full flex flex-col gap-4">
            {canAddMore && (
                <div
                    className={`flex flex-col min-h-22.5 py-8 items-center justify-center gap-2 bg-gray-1 border border-gray-1 rounded-[10px] transition-all cursor-pointer hover:bg-orange-light-1/50 ${
                        isDragging ? "border-orange-main bg-orange-light-1" : ""
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            handleFiles(files);
                        }}
                        className="hidden"
                    />

                    <div className="flex items-center justify-center gap-2.5">
                        <Upload className="size-4 text-gray-4" />
                        <p className="body3_r text-gray-4">컴퓨터에서 업로드</p>
                    </div>

                    {multiple && images.length > 0 && (
                        <p className="body4_r text-gray-4">
                            {images.length}/{maxFiles}개 업로드됨
                        </p>
                    )}
                </div>
            )}

            {images.length > 0 && (
                <>
                    {multiple && images.length > 1 && (
                        <div className="flex items-center gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setLayout("full")}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    layout === "full"
                                        ? "bg-gray-200 text-gray-700"
                                        : "text-gray-400 hover:text-gray-600"
                                }`}
                                title="Full width view"
                            >
                                <Rows className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setLayout("grid")}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    layout === "grid"
                                        ? "bg-gray-200 text-gray-700"
                                        : "text-gray-400 hover:text-gray-600"
                                }`}
                                title="Grid view"
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {layout === "full" && (
                        <div className="flex flex-col">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group overflow-hidden"
                                    style={{
                                        marginBottom: index < images.length - 1 ? "1px" : "0",
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer"
                                    >
                                        <X className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                            {index + 1} / {images.length}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === "grid" && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group aspect-square overflow-hidden rounded-[8px]"
                                >
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                            {index + 1} / {images.length}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {meta.touched && meta.error && (
                <p className="body5_r text-red-500 mt-2.5">{meta.error}</p>
            )}
        </div>
    );
}
