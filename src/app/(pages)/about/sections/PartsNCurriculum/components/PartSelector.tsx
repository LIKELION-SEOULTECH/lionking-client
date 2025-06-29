"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { Parts } from "@/types";
import { useEffect, useRef, useState } from "react";

type PartSelectorProps = {
    selectedPart: Parts;
    onChange: (part: Parts) => void;
};

const allParts: Parts[] = ["기획", "디자인", "프론트엔드", "백엔드", "AI"];

export default function PartSelector({ selectedPart, onChange }: PartSelectorProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(false);

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftGradient(scrollLeft > 0);
        setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
    };

    const scrollToSelected = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const selectedIndex = allParts.indexOf(selectedPart);
        const selectedButton = container.querySelector(`button:nth-child(${selectedIndex + 1})`);

        if (selectedButton) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = selectedButton.getBoundingClientRect();

            const scrollLeft =
                container.scrollLeft +
                buttonRect.left -
                containerRect.left -
                (containerRect.width - buttonRect.width) / 2;

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        checkScroll();
        scrollToSelected();
    }, [selectedPart, scrollToSelected]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        checkScroll();

        return () => {
            container.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6">
            <div className="relative">
                <div
                    className={cn(
                        "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none transition-opacity duration-200",
                        showLeftGradient ? "opacity-100" : "opacity-0"
                    )}
                />

                <div
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none transition-opacity duration-200",
                        showRightGradient ? "opacity-100" : "opacity-0"
                    )}
                />

                <div
                    ref={scrollContainerRef}
                    className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                >
                    <div className="w-fit mx-auto flex items-center justify-center rounded-full bg-gray-1 gap-0 sm:gap-6">
                        {allParts.map((part) => (
                            <PartSelectorItem
                                key={part}
                                name={part}
                                isSelected={selectedPart === part}
                                onClick={() => onChange(part)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PartSelectorItem({
    name,
    isSelected = false,
    onClick,
}: {
    name: Parts;
    isSelected?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative px-4 sm:px-8 py-2 rounded-full text-sm sm:text-xl font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap min-w-fit isolate"
        >
            {isSelected && (
                <motion.div
                    layoutId="part-indicator"
                    className="absolute inset-0 rounded-full bg-orange-main"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                />
            )}
            <span className={cn("relative z-10", isSelected ? "text-white" : "text-gray-5")}>
                {name}
            </span>
        </button>
    );
}
