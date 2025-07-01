// src/app/(pages)/dashboard/(pages)/members/role-edit/components/MemberRoleTable.tsx
"use client";

import React, { useState } from "react";
import MemberRoleRow from "./MemberRoleRow";
import ChevronDownGray from "@/assets/icons/chevron-down-gray.svg";

const dummy = [
    { id: 99, name: "홍길동", part: "기획", gen: "13기", role: "운영진" },
    // …실제 데이터로 교체하세요
];

export default function MemberRoleTable() {
    const [rows, setRows] = useState(dummy);

    return (
        <section className="flex flex-col gap-[10px] w-full">
            {/* 헤더 */}
            <header
                className={`
          w-full 
          flex items-center justify-between 
          bg-[#F6F6F6] border-t border-[#C5C5C5]
          pl-[20px] pr-[34px] py-[16px]
          body2_sb text-gray-800 select-none
        `}
            >
                <span>No.</span>
                <span>이름</span>

                <div className="flex items-center gap-[10px]">
                    <span>파트</span>
                    <ChevronDownGray className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-[10px]">
                    <span>기수</span>
                    <ChevronDownGray className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-[10px]">
                    <span>권한</span>
                    <ChevronDownGray className="w-6 h-6" />
                </div>
            </header>

            {/* ROW */}
            {rows.map((r) => (
                <MemberRoleRow
                    key={r.id}
                    data={r}
                    onUpdate={(d) =>
                        setRows((prev) => prev.map((p) => (p.id === d.id ? { ...p, ...d } : p)))
                    }
                />
            ))}
        </section>
    );
}
