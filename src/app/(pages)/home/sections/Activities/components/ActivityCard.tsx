"use client";

import useHoverAnimation from "@/hooks/animations/useHoverAnimation";
import { motion } from "motion/react";
import ActivityCardBadge from "./ActivityCardBadge";

export type ActivityCardProps = {
    title: string;
    description: string;
    backgroundImage: string;
};

export default function ActivityCard({ title, description, backgroundImage }: ActivityCardProps) {
    const { ref, isHovered } = useHoverAnimation<HTMLDivElement>();

    return (
        <motion.div
            ref={ref}
            className="relative group w-full h-full md:rounded-lg rounded-[20px] overflow-hidden bg-cover bg-center cursor-pointer transition-colors duration-500 border-0 border-orange-main hover:shadow-2xl hover:border"
            style={{
                transformStyle: "preserve-3d",
                perspective: 1200,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <motion.div
                className="absolute inset-0 z-10 bg-black/50"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end px-7 py-[30px] pointer-events-none">
                <div className="flex flex-col items-start justify-between h-full">
                    <ActivityCardBadge text={title} focused={isHovered} />
                    <motion.p
                        className="overflow-hidden pointer-events-auto body3_r text-white/90"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            height: isHovered ? "auto" : 0,
                            y: isHovered ? 0 : 10,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.05,
                        }}
                        style={{ overflowWrap: "break-word" }}
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}
