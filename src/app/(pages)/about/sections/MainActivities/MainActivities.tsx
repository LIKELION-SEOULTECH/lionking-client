"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import MainActivityCard from "./components/MainActivityCard";

export default function MainActivities() {
    const cardCount = 5;
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

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

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Section
            displayName="Main Activities"
            displayTitle="배우고, 상상하고, 실현하다"
            className="py-[200px]"
        >
            <div className="flex flex-col items-center justify-center gap-[120px]">
                {[...Array(cardCount)].map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                        className="w-full"
                    >
                        <MainActivityCard isFocused={focusedIndex === index} />
                    </div>
                ))}
            </div>
        </Section>
    );
}
