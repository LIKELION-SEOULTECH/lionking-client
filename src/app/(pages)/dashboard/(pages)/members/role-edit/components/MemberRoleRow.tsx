// src/app/(pages)/dashboard/(pages)/members/role-edit/components/MemberRoleRow.tsx
"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ConfirmModal from "./ConfirmModal";

/* ───────────────────────────────── types */
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

/* key → API field 매핑 (id·name 제외) */
const fieldMap: Record<"part" | "gen" | "role", "position" | "generation" | "role"> = {
    part: "position",
    gen: "generation",
    role: "role",
} as const;

export default function MemberRoleRow({ data, onUpdate }: Props) {
    const [row, setRow] = useState<Row>(data);

    const [pending, setPending] = useState<{
        key: keyof Row;
        value: string;
    } | null>(null);

    /* 로컬 상태 + 상위 테이블 동기화 */
    const handleChange = (key: keyof Row) => (val: string) => {
        const next = { ...row, [key]: val };
        setRow(next);
        onUpdate(next);
    };

    /* 드롭다운 선택 시 모달 띄우기 */
    const openConfirm = (key: keyof Row) => (val: string) => {
        setPending({ key, value: val });
    };

    /* 모달 성공 → 로컬 반영 */
    const applyPending = (newVal: string) => {
        if (!pending) return;
        handleChange(pending.key)(newVal);
        setPending(null);
    };

    return (
        <>
            {/* ─────────── 테이블 한 행 ─────────── */}
            <div className="w-full flex items-center h-[41px] pl-[22.5px]">
                {/* No / 이름 */}
                <div className="w-[261px] flex justify-between items-center body2_sb text-gray-800">
                    <span>{row.id}</span>
                    <span>{row.name}</span>
                </div>

                {/* 드롭다운 3개 */}
                <div className="ml-[147px] flex items-center gap-[153px]">
                    <Dropdown
                        value={row.part}
                        options={["기획", "디자인", "프론트엔드", "백엔드", "AI"]}
                        onSelect={openConfirm("part")}
                        width={99}
                        textColor="#787471"
                        showIcon={false}
                    />
                    <Dropdown
                        value={row.gen}
                        options={["13기", "12기"]}
                        onSelect={openConfirm("gen")}
                        width={89}
                        textColor="#787471"
                        showIcon={false}
                    />
                    <Dropdown
                        value={row.role}
                        options={["운영진", "아기사자", "휴면사자", "대표"]}
                        onSelect={openConfirm("role")}
                        width={113}
                        textColor="#FF7710"
                        showIcon={false}
                    />
                </div>
            </div>

            {/* ─────────── 확인 모달 ─────────── */}
            <ConfirmModal
                visible={pending !== null}
                memberId={row.id}
                memberName={row.name}
                field={pending ? fieldMap[pending.key as "part" | "gen" | "role"] : "role"}
                selectedValue={pending?.value ?? ""}
                onCancel={() => setPending(null)}
                onSuccess={applyPending}
            />
        </>
    );
}
