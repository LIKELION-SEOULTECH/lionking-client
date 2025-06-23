// src/components/NoticeDetail/DetailBody.tsx
"use client";

import React from "react";
import type { NoticeMock } from "@/__mocks__/noticeMock";

interface Props {
    notice: NoticeMock;
}

export default function DetailBody({ notice }: Props) {
    return (
        <div className="max-w-[1100px] mx-auto px-4 py-12 space-y-6">
            {notice.content.map((para, i) => (
                <p key={i} className="text-gray-800 leading-relaxed">
                    {para}
                </p>
            ))}

            {notice.hasAttachment && notice.attachment && (
                <div className="border rounded p-4 flex justify-between items-center bg-gray-50">
                    <div>
                        <p className="font-medium">{notice.attachment.name}</p>
                        <p className="text-sm text-gray-500">{notice.attachment.size}</p>
                    </div>
                    <a href={notice.attachment.url} download>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4M12 4v8"
                            />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
}
