// src/app/(pages)/apply/sections/Hero/Hero.tsx
"use client";

import React from "react";
import ApplyBanner from "@/assets/banner/applyBanner.svg";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden">
            <ApplyBanner className="block w-full h-auto" preserveAspectRatio="xMidYMin meet" />

            {/* 하단 배너 텍스트 영역 */}
            <div
                className="
          flex 
          justify-center 
          items-center 
          h-[70px] 
          gap-[100px] 
          text-[#FF7710] 
          head5_sb
        "
            >
                <span>LIKELION SEOULTECH RECRUITMENT</span>
                <span>2024.02.21 – 03.15</span>
                <span>LIKELION SEOULTECH RECRUITMENT</span>
            </div>
        </section>
    );
}
