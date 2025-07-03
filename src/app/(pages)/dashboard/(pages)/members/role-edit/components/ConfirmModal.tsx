// src/app/(pages)/dashboard/(pages)/members/role-edit/components/ConfirmModal.tsx
"use client";

import {
    patchMemberRole,
    patchMemberPosition,
    patchMemberGeneration,
} from "@/lib/api/endpoints/member.client";
import { Parts, Role } from "@/types";
import { useState } from "react";

/* 라벨 → ENUM 매핑 */
import { roleLabelToEnum, partLabelToEnum } from "@/lib/api/mappers/member-map";

type FieldType = "role" | "position" | "generation";

interface Props {
    visible: boolean;
    memberId: number;
    memberName: string;
    field: FieldType;
    selectedValue: string; // 테이블에 보이는 라벨
    onCancel: () => void;
    onSuccess: (value: string) => void; // 성공 시 라벨 그대로 전달
}

export default function ConfirmModal({
    visible,
    memberId,
    memberName,
    field,
    selectedValue,
    onCancel,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);
    if (!visible) return null;

    /* --------------------------- Confirm Handler -------------------------- */
    const handleConfirm = async () => {
        if (loading) return;
        setLoading(true);

        try {
            switch (field) {
                case "role": {
                    const enumVal = roleLabelToEnum[selectedValue as keyof typeof roleLabelToEnum];
                    await patchMemberRole(memberId, enumVal as Role);
                    break;
                }
                case "position": {
                    const enumVal = partLabelToEnum[selectedValue as keyof typeof partLabelToEnum];
                    await patchMemberPosition(memberId, enumVal as Parts);
                    break;
                }
                case "generation": {
                    // "13기" → 13
                    const num = Number(selectedValue.replace(/[^0-9]/g, ""));
                    await patchMemberGeneration(memberId, num);
                    break;
                }
                default:
                    throw new Error("Unknown field type");
            }

            onSuccess(selectedValue); // 테이블에는 한글 라벨 유지
            onCancel();
        } catch (err) {
            console.error(err);
            alert("변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };
    /* --------------------------------------------------------------------- */

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[516px] h-[209px] rounded-[20px] pt-[50px] px-[20px] pb-[20px] flex flex-col items-center">
                <p className="body2_sb text-gray-900 text-center">
                    {memberName}님을 {selectedValue}로 설정하시겠습니까?
                </p>

                <div className="flex gap-[10px] mt-[40px]">
                    <button
                        className="px-[87px] py-[12px] rounded-[10px] bg-[#F6F6F6] body4_m text-gray-700"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        취소
                    </button>
                    <button
                        className="px-[89px] py-[12px] rounded-[10px] bg-[#FF7710] body4_m text-white"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "저장 중…" : "확인"}
                    </button>
                </div>
            </div>
        </div>
    );
}
