"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface Props {
    editUrl: string;
    onDelete: () => Promise<void>; // 컨테이너에서 넘겨줌
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

            <DeleteConfirmationModal
                visible={confirm}
                resourceName={resourceName}
                onCancel={() => setConfirm(false)}
                onConfirm={async () => {
                    await onDelete(); // ← 컨테이너에서 넘어온 함수
                    setConfirm(false);
                }}
            />
        </div>
    );
}
