"use client";

import { motion } from "motion/react";
import useHoverAnimation from "@/hooks/animations/useHoverAnimation";

export type ReviewCardProps = {
    authorName?: string;
    authorBio?: string;
    content?: string;
};

export default function ReviewCard({ authorName, authorBio, content }: ReviewCardProps) {
    const { ref } = useHoverAnimation<HTMLDivElement>();

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col items-start justify-center w-[422px] p-6.25 gap-4 bg-gray-1 hover:bg-gray-1/50 rounded-[16px] overflow-hidden transition-colors duration-200"
        >
            <p className="sub3_sb text-gray-8">{authorName}</p>

            <p className="body4_m text-gray-4">{authorBio}</p>

            <p className="body3_r text-gray-8">{content}</p>
        </motion.div>
    );
}
