// src/app/(pages)/dashboard/(pages)/members/role-edit/components/MemberRoleTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import MemberRoleRow from "./MemberRoleRow";
import ChevronDownGray from "@/assets/icons/chevron-down-gray.svg";
import type { Member, Role } from "@/types";

/** 서버-측 프록시(/api/members)에서 멤버 목록 가져오기 */
async function fetchMembers(): Promise<Member[]> {
    const res = await fetch("/api/members", { cache: "no-store" });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const { data } = await res.json();
    return data as Member[];
}

export default function MemberRoleTable() {
    const [rows, setRows] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /** 컴포넌트 마운트 시 한 번만 호출 */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const members = await fetchMembers();
                if (!cancelled) setRows(members);
            } catch (e) {
                console.error("Member fetch failed:", e);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    if (isLoading) {
        return <p className="py-10 text-center text-gray-500">Loading members…</p>;
    }

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
            {rows.map((m) => (
                <MemberRoleRow
                    key={m.id}
                    data={{
                        id: m.id,
                        name: m.name,
                        part: m.positionLabel ?? "-",
                        gen: "13기", // 서버에서 고정 처리
                        role: m.roleLabel, // 예: "운영진"
                    }}
                    onUpdate={(d) =>
                        setRows((prev) =>
                            prev.map((p) =>
                                p.id === d.id ? { ...p, ...d, role: d.role as Role } : p
                            )
                        )
                    }
                />
            ))}
        </section>
    );
}
