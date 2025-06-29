"use client";

import ApplyBanner from "@/assets/banner/applyBanner.svg";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden pt-15">
            <ApplyBanner className="w-full h-auto" preserveAspectRatio="xMidYMin meet" />

            <div className="relative w-full overflow-x-hidden">
                <div className="w-full flex justify-center py-4 text-orange-main head5_sb">
                    <div className="relative inline-flex gap-8 md:gap-20 lg:gap-25 whitespace-nowrap">
                        <span className="shrink-0">LIKELION SEOULTECH RECRUITMENT</span>
                        <span className="shrink-0">2024.02.21 – 03.15</span>
                        <span className="shrink-0">LIKELION SEOULTECH RECRUITMENT</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
