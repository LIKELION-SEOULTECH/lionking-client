"use client";

import { StaggerParent, StaggerChild } from "@/components/animations/AppearStagger";
import TypeLogo from "@/components/ui/TypeLogo";
import ArrowRightIcon from "@/assets/ic_arrow2_right_white.svg";

export default function HeroText() {
    return (
        <StaggerParent delay={0.1} stagger={0.2}>
            <div className="w-full flex flex-col items-center justify-center gap-10">
                <StaggerChild>
                    <TypeLogo heightPx={32} />
                </StaggerChild>

                <StaggerChild>
                    <h1 className="head1_sb text-center text-gray-1">
                        실전으로 성장하는 최고의 경험,
                        <br /> 멋사와 함께 A to Z
                    </h1>
                </StaggerChild>

                <StaggerChild>
                    <ApplicationLetterButton />
                </StaggerChild>
            </div>
        </StaggerParent>
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
