"use client";

import Lottie from "lottie-react";

import BannerBackground from "@/assets/banner/about/banner_bg.svg";
import icons from "@/assets/banner/about/team/icons.json";

export default function AboutBanner() {
    return (
        <div className="relative w-full h-[528px] pt-[62px] overflow-hidden">
            <BannerBackground className="absolute inset-0 w-full h-full object-cover z-0" />

            <Lottie
                animationData={icons}
                loop={true}
                autoplay={true}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-10"
            />
        </div>
    );
}
