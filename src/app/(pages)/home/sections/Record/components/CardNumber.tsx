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
        <div className="w-full aspect-[3/1] md:aspect-[294/271] md:bg-gray-6 rounded-[24px] flex flex-col items-center justify-center">
            <p className="body2_sb text-gray-1 mb-2">{subheading}</p>
            <p className="head1_sb text-white flex items-baseline">
                <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }} />
                {suffix && <span className="ml-1">{suffix}</span>}
            </p>
        </div>
    );
}
