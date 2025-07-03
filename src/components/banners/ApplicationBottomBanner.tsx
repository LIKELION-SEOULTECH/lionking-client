"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { figmaPaintToCSS } from "@/lib/figmaToCss";
import { gradientDark, gradientLight, gradientMedium } from "@/design/gradients";
import CurvesSVG from "@/assets/banner/curves.svg";
import RightArrowSVG from "@/assets/banner/ic_arrow2_right_orange.svg";
import { ApplicationLetterButton } from "../ui/ApplicationLetterButton";

type ApplicationBottomBannerProps = {
    year: string;
    theme: "LIGHT" | "MEDIUM" | "DARK";
};

export default function ApplicationBottomBanner({ year, theme }: ApplicationBottomBannerProps) {
    const themes = {
        LIGHT: "text-orange-main",
        MEDIUM: "text-orange-main",
        DARK: "text-white",
    };

    const gradients = {
        LIGHT: gradientLight,
        MEDIUM: gradientMedium,
        DARK: gradientDark,
    };

    const ref = useRef<HTMLDivElement>(null);
    const [bg, setBg] = useState<string>("");

    useLayoutEffect(() => {
        if (!ref.current) return;
        const update = () => {
            const { width, height } = ref.current!.getBoundingClientRect();
            setBg(figmaPaintToCSS(gradients[theme], width, height));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div ref={ref} className="relative w-full overflow-hidden">
            <CurvesSVG className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto object-cover z-10" />
            <div
                className="w-screen h-[250px] md:h-[350px] overflow-hidden relative flex items-center justify-center"
                style={{
                    backgroundImage: bg,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="relative flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between w-full max-w-[1100px] px-6 lg:px-4 xl:px-0 z-20 gap-6 md:gap-0">
                    <p className={cn("z-10 head3_sb text-center md:text-left", themes[theme])}>
                        서울과학기술대학교
                        <br /> 멋사와 함께 성장하고 싶다면?
                    </p>

                    {/* <div className="sub2_sb bg-white text-gray-7 px-5 md:px-6.25 py-2.5 md:py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-white/70 border border-white hover:border-orange-main cursor-pointer transition-colors duration-200">
                        <span>{year} 모집 알림 신청</span>
                        <RightArrowSVG />
                    </div> */}
                    <ApplicationLetterButton />
                </div>
            </div>
        </div>
    );
}
