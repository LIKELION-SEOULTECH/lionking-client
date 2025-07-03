"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

export type DashboardMetricCardProps = {
    num: number;
    suffix?: string;
    decimals?: number;
    subheading: string;
};

export default function DashboardMetricCard({
    num,
    suffix = "",
    decimals = 0,
    subheading,
}: DashboardMetricCardProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!isInView) return;
        animate(0, num, {
            duration: 0.4,
            onUpdate(value) {
                if (!ref.current) return;

                ref.current.textContent = value.toFixed(decimals);
            },
        });
    }, [num, decimals, isInView]);

    return (
        <div className="flex w-full py-4 md:py-0 md:size-[241px] items-center justify-center lg:bg-gray-1 rounded-[20px]">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                <p className="sub2_sb text-gray-8">{subheading}</p>
                <p className="head1_sb text-orange-main">
                    <span ref={ref}></span>
                    {suffix && <span>{suffix}</span>}
                </p>
            </div>
        </div>
    );
}
