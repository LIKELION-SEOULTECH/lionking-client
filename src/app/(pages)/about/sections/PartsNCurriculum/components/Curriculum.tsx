"use client";

import type { Parts } from "@/types";
import { partCurriculumData } from "@/contents/partCurriculumData";
import { motion, AnimatePresence } from "motion/react";

export default function Curriculum({ part }: { part: Parts }) {
    const { roleDescription, curriculum } = partCurriculumData[part];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={part}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex flex-col items-center justify-center gap-10"
            >
                <PartRoles roleDescription={roleDescription} />

                <div className="w-full flex flex-col gap-5 items-center justify-center">
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
        <div className="w-full flex flex-col items-center justify-center max-w-[1058px] mx-auto">
            <div className="w-full flex flex-col gap-[18px] px-20 py-[30px]">
                <p className="sub1_sb text-orange-main">파트 역할</p>
                <p className="body2_sb text-gray-7">{roleDescription}</p>
            </div>
        </div>
    );
}

function CurriculumItem({ text, index }: { text: string; index: number }) {
    return (
        <div className="w-full flex items-center justify-start px-8 py-6 gap-[46px] sub1_sb text-gray-5">
            <span>{index}</span>
            <span>{text}</span>
        </div>
    );
}
