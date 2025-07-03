"use client";

import type { PartLabels } from "@/types";
import { partCurriculumData } from "@/contents/partCurriculumData";
import { motion, AnimatePresence } from "motion/react";

export default function Curriculum({ part }: { part: PartLabels }) {
    const { roleDescription, curriculum } = partCurriculumData[part];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={part}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex flex-col items-start justify-start gap-4 md:gap-10"
            >
                <PartRoles roleDescription={roleDescription} />

                <div className="w-full flex flex-col gap-4 sm:gap-5 items-start justify-start">
                    {curriculum.map((item, i) => (
                        <CurriculumItem key={i} text={item} index={i + 1} />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function PartRoles({ roleDescription }: { roleDescription: string }) {
    return (
        <div className="flex flex-col items-start justify-start w-full md:w-[1100px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-[20px] break-keep">
            <div className="w-full flex flex-col gap-3 sm:gap-4.5 px-6 sm:px-20 py-4 md:py-[30px]">
                <p className="sub1_sb text-orange-main">파트 역할</p>
                <p className="body2_sb text-gray-7">{roleDescription}</p>
            </div>
        </div>
    );
}

function CurriculumItem({ text, index }: { text: string; index: number }) {
    return (
        <div className="w-full flex items-center justify-start px-6 sm:px-8.25 py-4 sm:py-5.5 gap-6 sm:gap-11.5 sub1_sb text-gray-5 bg-gray-1 rounded-[16px] break-keep">
            <span>{index}</span>
            <span>{text}</span>
        </div>
    );
}
