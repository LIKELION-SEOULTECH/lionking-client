"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ProfileDropdownActionButtonProps } from "@/components/ui/Header/types";

export function MobileProfileDropdownActionButtonGroup({
    buttonGroups,
    isAnimating = false,
}: {
    buttonGroups: ProfileDropdownActionButtonProps[][];
    isAnimating?: boolean;
}) {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-4.5">
            {buttonGroups.map((group, groupIndex) => (
                <motion.div
                    key={groupIndex}
                    className="w-full flex flex-col items-start justify-start gap-4.5"
                    initial={isAnimating ? { opacity: 0, x: -20 } : false}
                    animate={isAnimating ? { opacity: 1, x: 0 } : false}
                    transition={{
                        delay: groupIndex * 0.1,
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >
                    {group.map((button, index) => (
                        <motion.div
                            key={index}
                            initial={isAnimating ? { opacity: 0, x: -10 } : false}
                            animate={isAnimating ? { opacity: 1, x: 0 } : false}
                            transition={{
                                delay: groupIndex * 0.1 + index * 0.05,
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            <MobileProfileDropdownActionButton {...button} />
                        </motion.div>
                    ))}
                    {groupIndex < buttonGroups.length - 1 && (
                        <motion.div
                            className="w-full h-[1px] bg-gray-5"
                            initial={isAnimating ? { scaleX: 0 } : false}
                            animate={isAnimating ? { scaleX: 1 } : false}
                            transition={{
                                delay: groupIndex * 0.1 + 0.2,
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            style={{ transformOrigin: "left" }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

export function MobileProfileDropdownActionButton({
    label,
    icon,
    onClick,
    href,
    className,
}: ProfileDropdownActionButtonProps) {
    const style = cn(
        "w-full flex items-center justify-start gap-2 px-3 body5_r text-white hover:text-orange-main cursor-pointer transition-colors duration-200",
        className
    );

    if (href) {
        return (
            <Link href={href} className={style}>
                <div>{icon}</div>
                <span>{label}</span>
            </Link>
        );
    }

    return (
        <button className={style} onClick={onClick}>
            <div>{icon}</div>
            <span>{label}</span>
        </button>
    );
}
