"use client";

import { motion } from "motion/react";
import TypeLogo from "@/components/TypeLogo";
import ArrowRightIcon from "@/assets/ic_arrow2_right_white.svg";

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.7,
            ease: "easeInOut",
        },
    }),
};

export default function HeroText() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-10">
            {[
                TypeLogo,
                () => (
                    <h1 className="head1_sb text-center text-gray-1">
                        실전으로 성장하는 최고의 경험,
                        <br /> 멋사와 함께 A to Z
                    </h1>
                ),
                ApplicationLetterButton,
            ].map((Component, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={itemVariants}
                    className="w-full flex justify-center"
                >
                    <Component {...(i === 0 ? { heightPx: 32 } : {})} />
                </motion.div>
            ))}
        </div>
    );
}

function ApplicationLetterButton() {
    return (
        <button className="flex items-center justify-center gap-2 bg-orange-main text-white sub2_sb px-[25px] py-3.5 rounded-full cursor-pointer hover:bg-orange-main/90 transition-colors duration-200">
            <span>14기 모집 알림 신청</span>
            <ArrowRightIcon />
        </button>
    );
}
