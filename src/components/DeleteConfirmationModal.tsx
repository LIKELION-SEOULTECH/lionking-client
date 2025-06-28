"use client";

import React from "react";

interface DeleteConfirmationModalProps {
    visible: boolean;
    resourceName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({
    visible,
    resourceName,
    onCancel,
    onConfirm,
}: DeleteConfirmationModalProps) {
    if (!visible) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[550px] h-[233px] rounded-[20px] p-[40px_100px] flex flex-col justify-between">
                <p className="body3_sb text-gray-800 text-center whitespace-nowrap text-[18px]">
                    {resourceName}을(를) 정말 삭제하시겠습니까?
                </p>
                <div className="flex justify-center items-center gap-[80px] mt-[24px]">
                    <button
                        className="body4_m text-gray-700 px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                    <button
                        className="body4_m text-white bg-red-600 px-4 py-2 hover:bg-red-700 rounded"
                        onClick={onConfirm}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
