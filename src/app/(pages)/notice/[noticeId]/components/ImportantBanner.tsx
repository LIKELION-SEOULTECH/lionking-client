"use client";

import React from "react";

interface ImportantBannerProps {
    notice: {
        title: string;
        createdAt: string;
    };
}

export default function ImportantBanner({ notice }: ImportantBannerProps) {
    return (
        <div className="relative pt-[62px] w-screen h-[352px] overflow-hidden flex justify-center items-center bg-gradient-to-r from-orange-50 to-orange-200">
            {/* 텍스트 블록: Tailwind 절대 위치 + flex-col + gap 적용 */}
            <div className="absolute left-[14%] top-[44%] flex flex-col gap-16">
                {/* 제목과 중요 배지 */}
                <div className="flex items-center gap-5">
                    <p className="text-[32px] font-bold text-gray-800">{notice.title}</p>
                    <span
                        className="inline-flex items-center justify-center
              w-[67px] h-[40px]
              bg-orange-main text-white
              sub2_sb text-[20px]
              rounded-full"
                    >
                        중요
                    </span>
                </div>
                {/* 작성일 */}
                <p className="text-[20px] text-gray-400">{notice.createdAt}</p>
            </div>
        </div>
    );
}
