// src/app/(pages)/apply/sections/Eligibility/Eligibility.tsx
"use client";

import React from "react";

export default function Eligibility() {
    const cards = [
        "매주 목요일 세션에 참여가능한 분",
        "아이디어톤과 중앙해커톤에 참여가능한 분",
        "다양한 협업 경험을 쌓고싶은 분",
    ];

    return (
        <section className="relative w-full">
            <div className="pt-[200px] flex flex-col items-center">
                {/* 제목 */}
                <h2 className="head2_b text-white">지원 자격 및 모집 대상</h2>

                {/* 대상 안내 박스 */}
                <div
                    className="
            mt-[32px]
            w-[1060px] h-[82px]
            bg-gray-6 rounded-[10px]
            px-[338px] py-[22px]
          "
                >
                    <p className="body2_sb text-white text-center">
                        서울과학기술대학교 모든 학우 (재·휴학생)
                    </p>
                </div>

                {/* 카드 그룹 */}
                <div className="mt-[32px] flex gap-[32px]">
                    {cards.map((text) => (
                        <div
                            key={text}
                            className="
                w-[332px] h-[239px]
                bg-gray-2 rounded-[20px]
                px-[79px] py-[88px]
                flex items-center justify-center
              "
                        >
                            <p className="body2_sb text-gray-900 text-center">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
