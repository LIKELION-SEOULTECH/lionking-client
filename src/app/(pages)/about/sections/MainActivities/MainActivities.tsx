"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import MainActivityCard from "./components/MainActivityCard";
import ScrollBeam from "./components/ScrollBeam";

export default function MainActivities() {
    const cardCount = 5;
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const stackRef = useRef<HTMLDivElement>(null);
    const [circleTops, setCircleTops] = useState<number[]>([]);

    useEffect(() => {
        const onScroll = () => {
            const centerY = window.innerHeight / 2;
            let closest = 0;
            let minDist = Infinity;

            cardRefs.current.forEach((ref, i) => {
                if (!ref) return;
                const rect = ref.getBoundingClientRect();
                const dist = Math.abs(centerY - (rect.top + rect.height / 2));
                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });
            setFocusedIndex(closest);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const measureCircles = () => {
            if (!stackRef.current) return;
            const containerRect = stackRef.current.getBoundingClientRect();
            const containerTop = containerRect.top + window.scrollY;
            const tops = cardRefs.current.map((ref) => {
                if (!ref) return 0;
                const r = ref.getBoundingClientRect();
                return r.top + r.height / 2 + window.scrollY - containerTop;
            });
            setCircleTops(tops);
        };

        window.addEventListener("scroll", measureCircles, { passive: true });
        window.addEventListener("resize", measureCircles);
        measureCircles();
        return () => {
            window.removeEventListener("scroll", measureCircles);
            window.removeEventListener("resize", measureCircles);
        };
    }, []);

    return (
        <Section
            displayName="Main Activities"
            displayTitle="배우고, 상상하고, 실현하다"
            className="py-[200px] relative"
        >
            <div className="relative flex pr-4 ml:pr-0">
                <ScrollBeam
                    targetRef={stackRef}
                    circleTops={circleTops}
                    focusedIndex={focusedIndex}
                />
                <div
                    ref={stackRef}
                    className="flex flex-col gap-[120px] ml-8 lg:ml-12 w-full relative"
                >
                    {[...Array(cardCount)].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="w-full pl-4 md:pl-8"
                        >
                            <MainActivityCard isFocused={focusedIndex === index} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
