"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type SectionProps = {
    displayName: string;
    displayTitle: string | string[];
    displayDescription?: string | string[];
    theme?: "DARK" | "LIGHT";
    children: React.ReactNode;
    className?: string;
};

const parentVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Section({
    displayName,
    displayTitle,
    displayDescription,
    theme = "DARK",
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            className={cn(className, "w-full flex flex-col items-center justify-center gap-18")}
        >
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.5 }}
                variants={parentVariants}
                className="flex flex-col items-center justify-center gap-7"
            >
                <motion.div
                    variants={parentVariants}
                    className="flex flex-col items-center justify-center gap-5"
                >
                    <motion.h2 variants={childVariants} className="sub1_sb text-orange-main">
                        {displayName}
                    </motion.h2>

                    <motion.div variants={childVariants}>
                        {Array.isArray(displayTitle) ? (
                            <h1
                                className={cn(
                                    "text-center head3_sb",
                                    theme === "DARK" ? "text-white" : "text-black"
                                )}
                            >
                                {displayTitle.map((title, index) => (
                                    <span key={index} className="block">
                                        {title}
                                    </span>
                                ))}
                            </h1>
                        ) : (
                            <h1
                                className={cn(
                                    "text-center head3_sb",
                                    theme === "DARK" ? "text-white" : "text-black"
                                )}
                            >
                                {displayTitle}
                            </h1>
                        )}
                    </motion.div>

                    {displayDescription && (
                        <motion.p
                            variants={childVariants}
                            className={cn(
                                "text-center body3_r",
                                theme === "DARK" ? "text-gray-2" : "text-gray-5"
                            )}
                        >
                            {Array.isArray(displayDescription)
                                ? displayDescription.map((desc, idx) => (
                                      <span key={idx} className="block">
                                          {desc}
                                      </span>
                                  ))
                                : displayDescription}
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
            {children}
        </section>
    );
}
