"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { RefObject, useEffect, useState } from "react";

export default function ScrollBeam({
    targetRef,
    circleTops,
}: {
    targetRef: RefObject<HTMLDivElement | null>;
    circleTops: number[];
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

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 10%", "end 300%"],
    });

    const fillHeight = useTransform(scrollYProgress, [0.1, 0.9], [0, beamHeight]);

    return (
        <div className="absolute top-0 left-0 w-[60px] pointer-events-none">
            <div style={{ height: beamHeight }} className="relative mx-auto w-[2px] bg-transparent">
                <motion.div
                    style={{
                        height: fillHeight,
                    }}
                    transition={{
                        ease: "easeInOut",
                        duration: 0.4,
                    }}
                    className="absolute top-0 left-0 w-full bg-[linear-gradient(to_bottom,_#FF6B00_0%,_#AE5410_80%,_#0F0F0F_100%)] rounded-full"
                />
            </div>

            {circleTops.map((top, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: `${top}px` }}
                >
                    <div className="h-4 w-4 rounded-full border-2 border-orange-main bg-white" />
                </div>
            ))}
        </div>
    );
}
