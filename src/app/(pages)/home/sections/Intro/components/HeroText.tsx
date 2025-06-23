"use client";

import { motion } from "motion/react";
import { StaggerParent, StaggerChild } from "@/components/animations/AppearStagger";
import TypeLogo from "@/components/ui/TypeLogo";
import ArrowRightIcon from "@/assets/ic_arrow2_right_white.svg";

const slideUpFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
};

export default function HeroText() {
    return (
        <StaggerParent delay={0.1} stagger={0.2}>
            <div className="w-full flex flex-col items-center justify-center gap-10">
                <StaggerChild>
                    <motion.div {...slideUpFade}>
                        <TypeLogo heightPx={36} />
                    </motion.div>
                </StaggerChild>

                <StaggerChild>
                    <motion.div {...slideUpFade}>
                        <h1
                            className="head1_sb text-center text-[clamp(26px,5vw,54px)]!"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to top, #FFE8D7 0%, #DC5F00 125%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            실전으로 성장하는 최고의 경험,
                            <br /> 멋사와 함께 A to Z
                        </h1>
                    </motion.div>
                </StaggerChild>

                <StaggerChild>
                    <motion.div {...slideUpFade}>
                        <ApplicationLetterButton />
                    </motion.div>
                </StaggerChild>
            </div>
        </StaggerParent>
    );
}

function ApplicationLetterButton() {
    return (
        <button className="flex items-center justify-center gap-2 bg-orange-main text-white sub2_sb px-[25px] py-2.5 md:py-3 lg:py-3.5 rounded-full cursor-pointer hover:bg-orange-main/90 transition-colors duration-200">
            <span>14기 모집 알림 신청</span>
            <ArrowRightIcon />
        </button>
    );
}
