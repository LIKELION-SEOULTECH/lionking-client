"use client";

interface Props {
    visible: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

export default function DropdownMenu({ visible, onEdit, onDelete }: Props) {
    if (!visible) return null;
    return (
        <div className="absolute top-6 right-0 w-[154px] bg-white rounded-lg shadow-md flex flex-col">
            <button
                className="body4_m text-gray-900 text-left px-4 py-2 hover:bg-gray-100"
                onClick={onEdit}
            >
                수정하기
            </button>
            <button
                className="body4_m text-gray-900 text-left px-4 py-2 hover:bg-gray-100"
                onClick={onDelete}
            >
                삭제하기
            </button>
        </div>
    );
}
