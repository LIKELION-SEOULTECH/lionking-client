"use client";

import { useRef, useEffect, useState } from "react";
import { useHorizontalLoop } from "@/hooks/animations/useHorizontalLoop";
import { motion, MotionProps } from "motion/react";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";

type ReviewCardListProps = {
    items: ReviewCardProps[];
    speed?: number;
};

export default function ReviewCardList({ items, speed = 100 }: ReviewCardListProps) {
    const groupRef = useRef<HTMLDivElement>(null);
    const [groupWidth, setGroupWidth] = useState(0);

    useEffect(() => {
        if (groupRef.current) {
            setGroupWidth(groupRef.current.offsetWidth);
        }
    }, [items]);

    const { x, setPaused } = useHorizontalLoop({
        speed,
        width: groupWidth,
    });

    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);
    const handleDragStart = () => setPaused(true);
    const handleDragEnd: MotionProps["onDragEnd"] = (_event, info) => {
        x.set(x.get() + info.offset.x);
        setPaused(false);
    };

    const allItems = [...items, ...items, ...items, ...items];

    return (
        <div
            className="relative w-screen py-4 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={groupRef}
                className="flex gap-x-8"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -groupWidth, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                {allItems.map((item, i) => (
                    <div key={i}>
                        <ReviewCard {...item} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
