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
                "rounded-[20px] origin-left transition-all",
                isFocused ? "shadow-[0px_10px_30px_rgba(0,0,0,0.3)]" : ""
            )}
            style={{
                background: isFocused
                    ? "linear-gradient(124deg, rgba(255,240,228,0.7) 0%, rgba(117,50,0,0.7) 100%)"
                    : "",
                opacity: isFocused ? 1 : 0.7,
                transform: `scale(${isFocused ? 1.13 : 1})`,
                transition: "all 0.4s ease-in-out",
            }}
        >
            <motion.div
                layout
                style={{
                    background: isFocused
                        ? "radial-gradient(circle, rgba(255,113,0,0.3) 0%, rgba(135,58,0,0.3) 50%)"
                        : "transparent",
                    transition: "all 0.4s ease-in-out",
                    padding: isFocused ? "30px" : "40px",
                }}
                className="rounded-[18px] flex items-center justify-center"
            >
                <CardContent isFocused={!!isFocused} />
            </motion.div>
        </motion.div>
    );
}

function CardContent({ isFocused }: { isFocused: boolean }) {
    return (
        <div className="w-full flex items-center justify-center gap-8 transition-all duration-500">
            <Image
                src="/static/images/placeholder.png"
                alt="Placeholder"
                width={415}
                height={306}
            />
            <MainActivityCardRightInfo isFocused={isFocused} />
        </div>
    );
}

function MainActivityCardRightInfo({ isFocused }: { isFocused: boolean }) {
    return (
        <div className="flex flex-col items-start justify-start gap-[30px] w-[453px] transition-all duration-500">
            <div className="flex flex-col items-start justify-start gap-4">
                <div className="w-fit px-[15.25px] py-[8.68px] bg-orange-main text-white rounded-full body5_r">
                    정기세션
                </div>
                <motion.p
                    className="text-white"
                    style={{
                        fontWeight: 600,
                        fontSize: isFocused ? "32px" : "24x",
                        lineHeight: isFocused ? "140%" : "150%",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    매주 진행되는 정기 세션을 통해 어쩌고 할 수 있어요 (설명)
                </motion.p>
            </div>
            <p className="body3_r text-gray-2">
                활동에 대한 설명을 적어주세요! 활동에 대한 설명을 적어주세요! 활동에 대한 설명을
                적어주세요! 활동에 대한 설명
            </p>
        </div>
    );
}
