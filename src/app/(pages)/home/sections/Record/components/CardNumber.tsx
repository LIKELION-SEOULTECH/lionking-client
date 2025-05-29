"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

type CardNumberProps = {
    num: number;
    suffix?: string;
    decimals?: number;
    subheading: string;
};

export default function CardNumber({
    num,
    suffix = "",
    decimals = 0,
    subheading,
}: CardNumberProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!isInView) return;
        animate(0, num, {
            duration: 2.5,
            onUpdate(value) {
                if (!ref.current) return;

                ref.current.textContent = value.toFixed(decimals);
            },
        });
    }, [num, decimals, isInView]);

    return (
        <div className="flex w-[294px] h-[271px] items-center justify-center bg-gray-6 rounded-[24px]">
            <div className="flex flex-col items-center justify-center gap-3.5">
                <p className="body2_sb text-gray-1">{subheading}</p>
                <p className="head1_sb text-white">
                    <span ref={ref}></span>
                    {suffix && <span>{suffix}</span>}
                </p>
            </div>
        </div>
    );
}
