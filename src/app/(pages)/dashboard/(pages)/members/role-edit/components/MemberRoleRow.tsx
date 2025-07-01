// src/app/(pages)/dashboard/(pages)/members/role-edit/components/MemberRoleRow.tsx
"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ConfirmModal from "./ConfirmModal"; // ← 모달 컴포넌트 임포트

type Row = {
    id: number;
    name: string;
    part: string;
    gen: string;
    role: string;
};

interface Props {
    data: Row;
    onUpdate: (row: Row) => void;
}

export default function MemberRoleRow({ data, onUpdate }: Props) {
    const [row, setRow] = useState<Row>(data);

    // 모달 띄우기 전 임시 저장용
    const [pending, setPending] = useState<{
        key: keyof Row;
        value: string;
    } | null>(null);

    const handleChange = (key: keyof Row) => (val: string) => {
        const next = { ...row, [key]: val };
        setRow(next);
        onUpdate(next);
    };

    // 드롭다운 클릭 시 모달 열기
    const openConfirm = (key: keyof Row) => (val: string) => {
        setPending({ key, value: val });
    };

    // 모달 확인 시 실제 반영
    const applyPending = () => {
        if (!pending) return;
        handleChange(pending.key)(pending.value);
        setPending(null);
    };

    return (
        <>
            <div className="w-full flex items-center h-[41px] pl-[22.5px]">
                {/* No./이름 영역 (261×37) */}
                <div className="w-[261px] flex justify-between items-center body2_sb text-gray-800">
                    <span>{row.id}</span>
                    <span>{row.name}</span>
                </div>

                {/* No/이름↔버튼 영역 gap 147 */}
                <div className="ml-[147px] flex items-center gap-[153px]">
                    <Dropdown
                        value={row.part}
                        options={["기획", "디자인", "프론트엔드", "백엔드", "AI"]}
                        onSelect={openConfirm("part")} // ← 변경
                        width={99}
                        textColor="#787471"
                        showIcon={false}
                    />
                    <Dropdown
                        value={row.gen}
                        options={["13기", "12기"]}
                        onSelect={openConfirm("gen")} // ← 변경
                        width={89}
                        textColor="#787471"
                        showIcon={false}
                    />
                    <Dropdown
                        value={row.role}
                        options={["운영진", "아기사자", "휴먼사자", "대표"]}
                        onSelect={openConfirm("role")} // ← 변경
                        width={113}
                        textColor="#FF7710"
                        showIcon={false}
                    />
                </div>
            </div>

            {/* 모달 */}
            <ConfirmModal
                visible={pending !== null}
                memberName={row.name}
                selectedValue={pending?.value ?? ""}
                onCancel={() => setPending(null)}
                onConfirm={applyPending}
            />
        </>
    );
}
