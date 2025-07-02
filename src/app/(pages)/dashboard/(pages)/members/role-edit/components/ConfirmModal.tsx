// src/app/(pages)/dashboard/(pages)/members/role-edit/components/ConfirmModal.tsx
"use client";

import {
    patchMemberRole,
    patchMemberPosition,
    patchMemberGeneration,
} from "@/lib/api/endpoints/member.client";
import { Parts, Role } from "@/types";
import { useState } from "react";

type FieldType = "role" | "position" | "generation";

interface Props {
    visible: boolean;
    memberId: number;
    memberName: string; // 예) "홍길동"
    field: FieldType; // "role" | "position" | "generation"
    selectedValue: string; // 예) "운영진", "DESIGN", "13"
    onCancel: () => void;
    /** 성공 시 상위 컴포넌트의 로컬 state 를 갱신하기 위한 콜백 */
    onSuccess: (value: string) => void;
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
        console.log("[Modal] field:", field, "selected:", selectedValue);
        if (loading) return;
        setLoading(true);

        try {
            switch (field) {
                case "role":
                    await patchMemberRole(memberId, selectedValue as Role);
                    break;
                case "position":
                    await patchMemberPosition(memberId, selectedValue as Parts);
                    break;
                case "generation":
                    await patchMemberGeneration(memberId, Number(selectedValue));
                    break;
                default:
                    throw new Error("Unknown field type");
            }

            // 로컬 테이블 상태 갱신
            onSuccess(selectedValue);
            onCancel(); // 모달 닫기
        } catch (e) {
            console.error(e);
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
