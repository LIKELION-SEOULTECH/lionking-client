// src/components/NoticeDetail/AccordionList.tsx
"use client";

import React from "react";
import noticeMock, { NoticeMock } from "@/__mocks__/noticeMock";

interface Props {
    currentId: number;
}

export default function AccordionList({ currentId }: Props) {
    const others: NoticeMock[] = noticeMock.filter((n) => n.id !== currentId);

    return (
        <div className="max-w-[1100px] mx-auto px-4 py-8 space-y-2">
            {others.map((n) => (
                <details key={n.id} className="border-t p-4">
                    <summary className="cursor-pointer flex justify-between">
                        <span>{n.title}</span>
                        <span className="text-gray-500">{n.createdAt}</span>
                    </summary>
                    <div className="mt-2 text-gray-700">
                        {/* 요약된 내용이나 미리보기 넣으셔도 되고 */}
                        {n.content?.[0] || "간단한 미리보기 내용…"}
                    </div>
                </details>
            ))}
        </div>
    );
}
