// src/app/(pages)/apply/sections/FAQ/FAQ.tsx
"use client";

import React, { useState } from "react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

const faqData = [
    {
        question: "Q. 파트 지원 자격이 어떻게 되나요? 관련 경험이 없어도 괜찮나요?",
        answer: "A. 지원하시고자 하는 파트에 대한 열정과 의지만 있으면 가능합니다",
    },
    {
        question: "Q. 세션은 언제 진행되나요?",
        answer: "A. 매주 목요일 오프라인으로 진행됩니다",
    },
    {
        question: "Q. 활동 기간이 어떻게 되나요?",
        answer: "A. 활동은 1년 동안 진행되며, 2학기 종강 시 수료하게 됩니다",
    },
    {
        question: "Q. 방학 때도 활동하나요?",
        answer: "A. 멋쟁이사자처럼의 주요 행사인 중앙해커톤이 있어 방학에도 활동합니다",
    },
    {
        question: "Q. 대학원생, 졸업생도 가능한가요?",
        answer: "A. 휴학생 혹은 재학생만 가능합니다",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full pt-[300px] pb-[200px] flex flex-col items-center">
            {/* 섹션 타이틀 */}
            <h2 className="head2_b text-white">FAQ</h2>

            {/* 리스트 컨테이너 */}
            <div className="mt-[80px] flex flex-col items-center space-y-[24px]">
                {faqData.map((item, idx) => {
                    const isOpen = idx === openIndex;
                    return (
                        <div
                            key={idx}
                            className={`
                w-[1060px] bg-gray-7 rounded-[10px]
                p-[24px] px-[34px]
                transition-all duration-300
                cursor-pointer
              `}
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                        >
                            {/* 질문 + 아이콘 */}
                            <div className="flex justify-between items-center">
                                <p className="body2_sb text-white">{item.question}</p>
                                <ChevronDownIcon
                                    className={`w-[24px] h-[24px] transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </div>

                            {/* 답변 */}
                            {isOpen && (
                                <p className="body2_sb text-[#C4C4C4] mt-[24px]">{item.answer}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
