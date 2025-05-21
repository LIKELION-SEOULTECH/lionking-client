"use client";
import { motion } from "motion/react";

export default function Appear({
    children,
    delay = 0,
    y = 20,
    duration = 0.6,
    ease = "easeOut",
    once = true,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    duration?: number;
    ease?: "easeOut" | "easeInOut" | number[];
    once?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration, ease }}
            viewport={{ once, amount: 0.6 }}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
}
