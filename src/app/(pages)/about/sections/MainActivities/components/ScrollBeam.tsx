"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { RefObject, useEffect, useState } from "react";

export default function ScrollBeam({
    targetRef,
    circleTops,
    focusedIndex,
}: {
    targetRef: RefObject<HTMLElement | null>;
    circleTops: number[];
    focusedIndex: number;
}) {
    const [beamHeight, setBeamHeight] = useState(0);

    useEffect(() => {
        const measure = () => {
            if (targetRef.current) {
                setBeamHeight(targetRef.current.scrollHeight);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [targetRef]);

    const fillTarget = useMotionValue(0);
    const fillHeight = useSpring(fillTarget, {
        stiffness: 200,
        damping: 25,
    });

    useEffect(() => {
        const y = circleTops[focusedIndex] ?? 0;
        fillTarget.set(y);
    }, [circleTops, focusedIndex, fillTarget]);

    return (
        <div className="absolute top-0 left-0 w-8 pointer-events-none">
            <div
                style={{ height: beamHeight }}
                className="relative mx-auto w-[2px] bg-transparent overflow-hidden"
            >
                <motion.div
                    style={{
                        height: fillHeight,
                    }}
                    transition={{
                        ease: "easeInOut",
                        duration: 0.4,
                    }}
                    className="absolute top-0 left-0 w-full bg-[linear-gradient(to_bottom,_#FF6B00_0%,_#AE5410_90%,_#0F0F0F_100%)] rounded-full"
                />
            </div>
            {circleTops.map((top, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: `${top}px` }}
                >
                    <div className="size-3 md:size-4 rounded-full border-2 border-orange-main bg-white" />
                </div>
            ))}
        </div>
    );
}
