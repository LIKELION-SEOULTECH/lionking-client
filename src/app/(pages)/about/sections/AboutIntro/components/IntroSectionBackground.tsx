"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { figmaPaintToCSS, GradientPaint } from "@/lib/figmaToCss";

const verticalGradient: GradientPaint = {
    type: "GRADIENT_LINEAR",
    gradientTransform: [
        [0, 1, 0],
        [1, 0, 0],
    ],
    gradientStops: [
        { position: 0.0, color: { r: 0.29412, g: 0.12549, b: 0.0, a: 0.5 } },
        { position: 1.0, color: { r: 0.08235, g: 0.08235, b: 0.08235, a: 1 } },
    ],
};

export default function IntroSectionBackground() {
    const ref = useRef<HTMLDivElement>(null);
    const [bg, setBg] = useState<string>("");

    useLayoutEffect(() => {
        if (!ref.current) return;
        const update = () => {
            const { width, height } = ref.current!.getBoundingClientRect();
            setBg(figmaPaintToCSS(verticalGradient, width, height));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden">
            <Image
                src="/static/images/about_intro.png"
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
