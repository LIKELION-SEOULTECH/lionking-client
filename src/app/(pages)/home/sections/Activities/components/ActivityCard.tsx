"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ActivityCardBadge from "./ActivityCardBadge";

export type ActivityCardProps = {
    title: string;
    description: string;
    backgroundImage: string;
};

export default function ActivityCard({ title, description, backgroundImage }: ActivityCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative w-full aspect-[3/2] sm:aspect-[4/3] rounded-[20px] overflow-hidden bg-cover bg-center cursor-pointer border-0 border-orange-main"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            animate={{
                scale: isHovered ? 1.015 : 1,
                boxShadow: isHovered
                    ? "0 16px 32px rgba(0,0,0,0.40)"
                    : "0 8px 16px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.div
                className="absolute inset-0 z-10 bg-black/50"
                animate={{ opacity: isHovered ? 0.6 : 0.3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 sm:px-7 py-6 pointer-events-none">
                <div className="flex flex-col justify-between h-full">
                    <ActivityCardBadge text={title} focused={isHovered} />
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                        className="pointer-events-auto text-white/90 overflow-hidden"
                        style={{
                            maxHeight: isHovered ? 200 : 0,
                            transition: "max-height 0.5s ease",
                        }}
                    >
                        <p className="body3_r break-keep">{description}</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
