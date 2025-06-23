"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

type MainActivityCardProps = {
    isFocused?: boolean;
};

export default function MainActivityCard({ isFocused }: MainActivityCardProps) {
    return (
        <motion.div
            layout
            className={cn(
                "card-bg",
                isFocused && "focused",
                isFocused
                    ? "shadow-[0px_10px_30px_rgba(0,0,0,0.3)] scale-[1] p-5 md:p-[30px]"
                    : "opacity-70 scale-[0.88] p-6 md:p-[40px]"
            )}
        >
            <CardContent isFocused={!!isFocused} />
        </motion.div>
    );
}

function CardContent({ isFocused }: { isFocused: boolean }) {
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 transition-all duration-500">
            <div className="w-full md:w-[415px] flex-shrink-0">
                <Image
                    src="/static/images/placeholder.png"
                    alt="Placeholder"
                    width={415}
                    height={306}
                    className="w-full h-auto"
                />
            </div>
            <MainActivityCardRightInfo isFocused={isFocused} />
        </div>
    );
}

function MainActivityCardRightInfo({ isFocused }: { isFocused: boolean }) {
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
                    정기세션
                </motion.div>
                <motion.p
                    className="head3_sb text-white"
                    initial={{ scale: 1 }}
                    animate={{ scale: isFocused ? 1 : 1 / 1.33 }}
                    style={{ transformOrigin: "left center" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    매주 진행되는 정기 세션을 통해 어쩌고 할 수 있어요 (설명)
                </motion.p>
            </div>
            <motion.p
                className="body3_r text-gray-2"
                initial={{ scale: 1 }}
                animate={{ scale: isFocused ? 1 : 1 / 1.33 }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                활동에 대한 설명을 적어주세요! 활동에 대한 설명을 적어주세요! 활동에 대한 설명을
                적어주세요! 활동에 대한 설명
            </motion.p>
        </div>
    );
}
