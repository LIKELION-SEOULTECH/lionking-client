import { Variants } from "motion/react";

export default function useOnAppear({
    type = "single",
    delay = 0,
    stagger = 0.15,
    duration = 0.6,
    y = 20,
    ease = "easeOut",
}: {
    type?: "single" | "staggered";
    delay?: number;
    stagger?: number;
    duration?: number;
    y?: number;
    ease?: "easeIn" | "easeOut" | "easeInOut" | number[];
}) {
    if (type === "staggered") {
        const parentVariants: Variants = {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: stagger,
                    delayChildren: delay,
                },
            },
        };

        const childVariants: Variants = {
            hidden: { opacity: 0, y },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease },
            },
        };

        return { parentVariants, childVariants };
    }

    const singleVariants: Variants = {
        hidden: { opacity: 0, y },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease, delay },
        },
    };

    return { singleVariants };
}
