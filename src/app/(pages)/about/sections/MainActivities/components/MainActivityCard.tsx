"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

export type MainActivityCardContent = {
    badge: string;
    title: string;
    description: string;
    imageSrc: string;
};

type MainActivityCardProps = {
    isFocused: boolean;
    content: MainActivityCardContent;
};

export default function MainActivityCard({ isFocused, content }: MainActivityCardProps) {
    return (
        <motion.div
            layout
            className={cn(
                "card-bg",
                isFocused && "focused",
                isFocused
                    ? "opacity-100 shadow-[0px_10px_30px_rgba(0,0,0,0.3)] scale-[1] p-5 md:p-[30px]"
                    : "opacity-[0.6] scale-[0.88] p-6 md:p-[40px]"
            )}
        >
            <CardContent isFocused={isFocused} content={content} />
        </motion.div>
    );
}

function CardContent({ isFocused, content }: MainActivityCardProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 transition-all duration-500 md:flex-row md:gap-8">
            <div className="w-full md:w-[415px] flex-shrink-0">
                <Image
                    src={content.imageSrc}
                    alt="Placeholder"
                    width={415}
                    height={306}
                    className="w-full h-auto rounded-[20px]"
                />
            </div>
            <MainActivityCardRightInfo isFocused={isFocused} content={content} />
        </div>
    );
}

function MainActivityCardRightInfo({ isFocused, content }: MainActivityCardProps) {
    return (
        <div className="flex flex-col items-start justify-start gap-6 md:gap-[30px] w-full md:w-[453px] transition-all duration-500 break-keep">
            <div className="flex flex-col items-start justify-start gap-3">
                <motion.div
                    className="w-fit px-3 md:px-[15.25px] py-1.5 md:py-[8.68px] bg-orange-main text-white rounded-full body5_r"
                    initial={{ scale: 1 }}
                    animate={{ scale: isFocused ? 1 : 1 / 1.33 }}
                    style={{ transformOrigin: "left bottom" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {content.badge}
                </motion.div>
                <motion.p
                    className="text-white head3_sb"
                    initial={{ scale: 1 }}
                    animate={{ scale: isFocused ? 1 : 1 / 1.33 }}
                    style={{ transformOrigin: "left center" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {content.title}
                </motion.p>
            </div>
            <motion.p
                className="body3_r text-gray-2"
                initial={{ scale: 1 }}
                animate={{ scale: isFocused ? 1 : 1 / 1.33 }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                {content.description}
            </motion.p>
        </div>
    );
}
