"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { figmaPaintToCSS, GradientPaint } from "@/lib/figmaToCss";

const verticalVignette: GradientPaint = {
    /*
    Gradient:
        - 3% – #151515, opacity 1
        - 41% – #151515, opacity 0.5
        - 58% – transparent
        - 100% – #151515, opacity 1
    */

    type: "GRADIENT_LINEAR",
    gradientTransform: [
        [0, 1, 0],
        [1, 0, 0],
    ],
    gradientStops: [
        { position: 0.03, color: { r: 0.08235, g: 0.08235, b: 0.08235, a: 1 } },
        { position: 0.41, color: { r: 0.08235, g: 0.08235, b: 0.08235, a: 0.5 } },
        { position: 0.58, color: { r: 0.08235, g: 0.08235, b: 0.08235, a: 0 } },
        { position: 1.0, color: { r: 0.08235, g: 0.08235, b: 0.08235, a: 1 } },
    ],
};

export default function RecordSectionBackground() {
    const ref = useRef<HTMLDivElement>(null);
    const [bg, setBg] = useState<string>("");

    useLayoutEffect(() => {
        if (!ref.current) return;
        const update = () => {
            const { width, height } = ref.current!.getBoundingClientRect();
            setBg(figmaPaintToCSS(verticalVignette, width, height));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div
            ref={ref}
            className="absolute top-0 left-[calc(50%-50vw-2px)] w-[calc(100vw+4px)] h-screen overflow-hidden"
        >
            <Image
                src="/static/images/home_record.png"
                alt="배경 이미지. 세션 진행 중인 모습."
                fill
                className="object-cover"
                priority
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: bg,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            />
        </div>
    );
}
