// notice/[noticeId]/components/AccordionList.tsx
"use client";

import React from "react";
import Link from "next/link";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

interface Notice {
    id: number;
    title: string;
    createdAt: string;
}

interface AccordionListProps {
    currentId: number;
}

// TODO: 실제 API 연동 시 이 배열을 교체하세요.
const dummyNotices: Notice[] = [
    { id: 1, title: "[멋사 홈페이지 발표 및 팀미팅 안내]", createdAt: "2025.04.18" },
    { id: 2, title: "[새로운 기능 릴리즈 안내]", createdAt: "2025.04.20" },
    { id: 3, title: "[서버 점검 안내]", createdAt: "2025.04.22" },
];

export default function AccordionList({ currentId }: AccordionListProps) {
    const idx = dummyNotices.findIndex((n) => n.id === currentId);
    const prev = idx > 0 ? dummyNotices[idx - 1] : null;
    const next = idx < dummyNotices.length - 1 ? dummyNotices[idx + 1] : null;

    return (
        <div className="w-screen pb-[250px]">
            {/* 리스트 컨테이너: 상단 100px 아래, 너비 1060px 중앙 정렬 */}
            <div className="mt-[100px] w-[1060px] mx-auto border-t">
                {prev && (
                    <Link
                        href={`/notice/${prev.id}`}
                        className="flex items-center justify-between py-4 hover:bg-gray-50"
                    >
                        <HiChevronUp className="w-[67px] h-[28px] text-gray-600" />
                        <p className="body3(new)_m text-gray-800 ml-4 flex-1">{prev.title}</p>
                        <p className="body3(new)_m text-gray-500">{prev.createdAt}</p>
                    </Link>
                )}

                {next && (
                    <Link
                        href={`/notice/${next.id}`}
                        className="flex items-center justify-between py-4 border-t hover:bg-gray-50"
                    >
                        <HiChevronDown className="w-[67px] h-[28px] text-gray-600" />
                        <p className="body3(new)_m text-gray-800 ml-4 flex-1">{next.title}</p>
                        <p className="body3(new)_m text-gray-500">{next.createdAt}</p>
                    </Link>
                )}
            </div>
        </div>
    );
}
