"use client";
import { motion } from "motion/react";

export function StaggerParent({
    children,
    delay = 0,
    stagger = 0.15,
    once = true,
}: {
    children: React.ReactNode;
    delay?: number;
    stagger?: number;
    once?: boolean;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.5 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        delayChildren: delay,
                        staggerChildren: stagger,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChild({
    children,
    y = 20,
    duration = 0.6,
    ease = "easeOut",
}: {
    children: React.ReactElement;
    y?: number;
    duration?: number;
    ease?: "easeOut" | "easeInOut" | number[];
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration, ease },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
