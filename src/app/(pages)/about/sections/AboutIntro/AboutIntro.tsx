"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import IntroSectionBackground from "./components/IntroSectionBackground";

export default function AboutIntro() {
    return (
        <div className="relative w-full mx-auto">
            <IntroSectionBackground />

            <Section displayName="About" className="relative z-10 py-[200px]">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.3,
                                delayChildren: 0.3,
                            },
                        },
                    }}
                    className="text-center body1_sb -mt-9"
                >
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-block relative"
                    >
                        <span className="relative inline-block">
                            <span className="relative z-10">서울과학기술대학교 멋쟁이사자처럼</span>
                            <motion.span
                                className="absolute inset-0 bg-orange-main z-0 origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 18,
                                    delay: 0.8,
                                }}
                                style={{
                                    transformOrigin: "left center",
                                }}
                            />
                        </span>{" "}
                        은
                    </motion.p>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mt-4"
                    >
                        기획자와 디자이너, 개발자가 모여 함께 협업하고,
                        <br />
                        실전 프로젝트를 통해 빠른 성장과 실무 경험을 쌓는
                        <br />
                        IT 창업 중심의 연합 동아리입니다.
                    </motion.p>
                </motion.div>
            </Section>
        </div>
    );
}
