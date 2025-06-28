"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";

interface Props {
    editUrl: string;
    onDelete: () => Promise<void>;
    resourceName?: string;
}

export default function EditDeleteMenu({ editUrl, onDelete, resourceName = "게시물" }: Props) {
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    /* 메뉴 외부 클릭 시 닫힘 */
    useEffect(() => {
        const cb = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", cb);
        return () => document.removeEventListener("mousedown", cb);
    }, []);

    const handleEdit = () => {
        setOpen(false);
        router.push(editUrl);
    };

    return (
        <div className="absolute top-0 right-0 inline-block" ref={ref}>
            <HiOutlineDotsHorizontal
                className="w-6 h-6 text-gray-600 cursor-pointer"
                onClick={() => setOpen((o) => !o)}
            />

            <DropdownMenu
                visible={open}
                onEdit={handleEdit}
                onDelete={() => {
                    setOpen(false);
                    setConfirm(true);
                }}
            />

            {/* 삭제 확인 모달 */}
            {confirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[550px] h-[233px] rounded-[20px] p-[40px_100px] flex flex-col justify-between">
                        <p className="body3_sb text-gray-800 text-center whitespace-nowrap text-[18px]">
                            {resourceName}을(를) 정말 삭제하시겠습니까?
                        </p>
                        <div className="flex justify-center items-center gap-[80px] mt-[24px]">
                            <button
                                className="body4_m text-gray-700 px-4 py-2 hover:bg-gray-100 rounded"
                                onClick={() => setConfirm(false)}
                            >
                                취소
                            </button>
                            <button
                                className="body4_m text-white bg-red-600 px-4 py-2 hover:bg-red-700 rounded"
                                onClick={async () => {
                                    await onDelete();
                                    setConfirm(false);
                                }}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
