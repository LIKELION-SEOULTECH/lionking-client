"use client";

import React from "react";

interface NormalBannerProps {
    notice: {
        title: string;
        createdAt: string;
    };
}

export default function NormalBanner({ notice }: NormalBannerProps) {
    return (
        <div className="relative pt-[62px] w-screen h-[352px] bg-gray-1 overflow-hidden flex justify-center items-center">
            {/* 텍스트 블록: Tailwind 절대 위치 + flex-col + gap 적용 */}
            <div className="absolute left-[14%] top-[40%] flex flex-col gap-16">
                {/* 제목 */}
                <p className="text-[32px] head3_sb font-bold text-gray-800">{notice.title}</p>
                {/* 작성일 */}
                <p className="text-[20px] text-gray-400">{notice.createdAt}</p>
            </div>
        </div>
    );
}
