"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ActivityCardBadge from "./ActivityCardBadge";

export type ActivityCardProps = {
    title: string;
    description: string;
    backgroundImage: string;
};

export default function ActivityCard({
    title = "파트별 세션",
    description = "파트별로 진행되는 실무 중심 교육으로 프로젝트에 필요한 활동 지식을 쌓아요.",
    backgroundImage = "https://images.unsplash.com/photo-1585856141833-ca095e957dd3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: ActivityCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative w-full h-full md:rounded-lg rounded-[20px] overflow-hidden bg-cover bg-center cursor-pointer border-0 border-orange-main"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
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

            <div className="absolute inset-0 z-20 flex flex-col justify-end px-7 py-[30px] pointer-events-none">
                <div className="flex flex-col items-start justify-between h-full">
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
                        <p className="body3_r">{description}</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
