"use client";
import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import BannerBackground from "@/assets/banner/about/banner_bg.svg";
import icons from "@/assets/banner/about/team/icons.json";

export default function AboutBanner() {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (!lottieRef.current) return;

        const smoothBezier = (t: number): number => 1 - Math.pow(1 - t, 4);

        const totalFrames = lottieRef.current.getDuration(true) ?? 0;
        const animationDuration = 1000;
        let startTime: number | null = null;
        let lastFrame = -1;
        let frameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / animationDuration, 1);
            const eased = smoothBezier(progress);
            const frame = eased * totalFrames;

            if (Math.abs(frame - lastFrame) > 0.01) {
                lottieRef.current?.goToAndStop(frame, true);
                lastFrame = frame;
            }

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        const animationItem = lottieRef.current.animationItem;
        if (animationItem) {
            animationItem.setSubframe(true);
            animationItem.renderer?.setQuality?.("high");
        }

        lottieRef.current.stop();
        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="relative w-full max-h-[500px] pt-[60px] overflow-hidden">
            <BannerBackground className="relative w-full h-full" />
            <Lottie
                lottieRef={lottieRef}
                animationData={icons}
                autoplay={false}
                loop={false}
                rendererSettings={{
                    progressiveLoad: false,
                    hideOnTransparent: true,
                    className: "lottie-animation",
                }}
                className="absolute inset-0 w-full h-full pointer-events-none pt-[60px]"
            />
        </div>
    );
}
