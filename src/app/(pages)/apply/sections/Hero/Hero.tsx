"use client";

import ApplyBanner from "@/assets/banner/applyBanner.svg";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative w-full max-h-[500px] pt-[60px] overflow-hidden">
                <ApplyBanner className="relative w-full h-full" />
            </div>

            <div className="relative h-[70px] overflow-hidden bg-gray-8">
                <div className="absolute top-1/2 left-0 flex gap-[100px] whitespace-nowrap text-orange-main head5_sb animate-marquee translate-y-[-50%]">
                    <span>2024.02.21 – 03.15</span>
                    <span>LIKELION SEOULTECH RECRUITMENT</span>
                    <span>2024.02.21 – 03.15</span>
                    <span>LIKELION SEOULTECH RECRUITMENT</span>
                    <span>2024.02.21 – 03.15</span>
                    <span>LIKELION SEOULTECH RECRUITMENT</span>
                    <span>2024.02.21 – 03.15</span>
                    <span>LIKELION SEOULTECH RECRUITMENT</span>
                </div>
            </div>
        </section>
    );
}
