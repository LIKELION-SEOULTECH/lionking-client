"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
        <section className="relative w-full pt-[300px] pb-[200px] flex flex-col items-center px-4">
            <h2 className="head2_b text-white">FAQ</h2>

            <div className="mt-20 w-full max-w-[1060px] flex flex-col space-y-6">
                {faqData.map((item, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div
                            key={idx}
                            className="w-full bg-gray-7 rounded-[10px] px-6 py-5 transition-all duration-200 cursor-pointer"
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                        >
                            <div className="flex justify-between items-center">
                                <p className="sub2_sb text-white">{item.question}</p>
                                <ChevronDownIcon
                                    className={`w-6 h-6 transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </div>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="body4_m text-gray-3 mt-6">{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
