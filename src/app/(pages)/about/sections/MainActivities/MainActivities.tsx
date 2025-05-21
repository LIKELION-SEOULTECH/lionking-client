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
        const handleScroll = () => {
            const centerY = window.innerHeight / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            cardRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(centerY - elementCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            setFocusedIndex(closestIndex);
        };

        const measureCirclePositions = () => {
            const tops: number[] = [];
            if (stackRef.current) {
                const containerTop = stackRef.current.getBoundingClientRect().top + window.scrollY;
                cardRefs.current.forEach((ref) => {
                    if (ref) {
                        const rect = ref.getBoundingClientRect();
                        const center = rect.top + rect.height / 2 + window.scrollY - containerTop;
                        tops.push(center);
                    }
                });
            }
            setCircleTops(tops);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", measureCirclePositions);
        handleScroll();
        measureCirclePositions();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", measureCirclePositions);
        };
    }, []);

    return (
        <Section
            displayName="Main Activities"
            displayTitle="배우고, 상상하고, 실현하다"
            className="py-[200px]"
        >
            <div className="relative flex">
                <ScrollBeam targetRef={stackRef} circleTops={circleTops} />

                <div ref={stackRef} className="flex flex-col gap-[120px] ml-[60px] w-full relative">
                    {[...Array(cardCount)].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="w-full pl-8"
                        >
                            <MainActivityCard isFocused={focusedIndex === index} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
