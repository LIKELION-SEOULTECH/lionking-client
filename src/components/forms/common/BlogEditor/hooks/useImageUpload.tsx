import { useCallback, useState } from "react";

export const useImageUpload = (onImageUpload?: (file: File) => Promise<string>) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const validateImageDimensions = useCallback(
        (file: File): Promise<{ width: number; height: number }> => {
            return new Promise((resolve, reject) => {
                const _URL = window.URL || window.webkitURL;
                const img = new Image();
                img.onload = function () {
                    const width = img.width;
                    const height = img.height;
                    _URL.revokeObjectURL(img.src);
                    if (width > 5000 || height > 5000)
                        reject(
                            new Error(
                                `이미지 크기가 너무 큽니다. 5000x5000px 이하여야 합니다. (현재: ${width}x${height}px)`
                            )
                        );
                    else if (width < 50 || height < 50)
                        reject(new Error(`이미지가 너무 작습니다. 50x50px 이상이어야 합니다.`));
                    else resolve({ width, height });
                };
                img.onerror = () => {
                    _URL.revokeObjectURL(img.src);
                    reject(new Error("이미지를 로드할 수 없습니다."));
                };
                img.src = _URL.createObjectURL(file);
            });
        },
        []
    );

    const preloadImage = useCallback((url: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("이미지를 미리 로드할 수 없습니다."));
            img.src = url;
        });
    }, []);

    const handleImageFile = useCallback(
        async (file: File): Promise<{ url: string; width: number; height: number }> => {
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type))
                throw new Error("JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.");
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                throw new Error(`이미지 크기는 10MB를 초과할 수 없습니다. (현재: ${sizeMB}MB)`);
            }
            setIsUploading(true);
            setUploadProgress(0);
            try {
                const { width, height } = await validateImageDimensions(file);
                let url: string;
                if (onImageUpload) {
                    url = await onImageUpload(file);
                    await preloadImage(url);
                } else {
                    await new Promise<void>((resolve) => {
                        const total = 10;
                        let tick = 0;
                        const iv = setInterval(() => {
                            tick++;
                            setUploadProgress((tick / total) * 100);
                            if (tick === total) {
                                clearInterval(iv);
                                resolve();
                            }
                        }, 50);
                    });
                    url = URL.createObjectURL(file);
                }
                return { url, width, height };
            } finally {
                setUploadProgress(0);
                setIsUploading(false);
            }
        },
        [onImageUpload, validateImageDimensions, preloadImage]
    );

    return { handleImageFile, isUploading, uploadProgress };
};
