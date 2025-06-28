"use client";

interface Props {
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
}: Props) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[516px] h-[209px] rounded-[20px] pt-[50px] px-[20px] pb-[20px] flex flex-col items-center">
                <p className="body2_sb text-gray-900 text-center whitespace-nowrap">
                    {resourceName}을(를) 정말 삭제하시겠습니까?
                </p>

                <div className="flex gap-[10px] mt-[40px]">
                    <button
                        className="px-[87px] py-[12px] rounded-[10px] bg-[#F6F6F6] body4_m text-gray-700"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                    <button
                        className="px-[89px] py-[12px] rounded-[10px] bg-[#FF7710] body4_m text-white"
                        onClick={onConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
