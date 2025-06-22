"use client";

import { useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import BannerBackground from "@/assets/banner/about/banner_bg.svg";
import icons from "@/assets/banner/about/team/icons.json";

export default function AboutBanner() {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [direction, setDirection] = useState<1 | -1>(1);

    const handleComplete = () => {
        if (!lottieRef.current) return;

        const nextDir = (direction === 1 ? -1 : 1) as 1 | -1;
        setDirection(nextDir);
        lottieRef.current.setDirection(nextDir);

        const totalFrames = lottieRef.current.getDuration(true);
        const jumpToFrame = nextDir === 1 ? 0 : totalFrames;

        lottieRef.current.goToAndPlay(jumpToFrame ?? 0, true);
    };

    return (
        <div className="relative w-full max-h-[500px] pt-[60px] overflow-hidden">
            <BannerBackground className="relative w-full h-full" />

            <Lottie
                lottieRef={lottieRef}
                animationData={icons}
                autoplay={true}
                loop={false}
                onComplete={handleComplete}
                className="absolute top-0 left-0 w-full h-full pointer-events-none pt-[60px]"
            />
        </div>
    );
}
