"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { Parts } from "@/types";

type PartSelectorProps = {
    selectedPart: Parts;
    onChange: (part: Parts) => void;
};

const allParts: Parts[] = ["기획", "디자인", "프론트엔드", "백엔드", "AI"];

export default function PartSelector({ selectedPart, onChange }: PartSelectorProps) {
    return (
        <div className="w-full flex items-center justify-center max-w-[1058px] mx-auto">
            <div className="w-fit flex items-center justify-center rounded-full bg-gray-1 gap-[23px]">
                {allParts.map((part) => (
                    <PartSelectorItem
                        key={part}
                        name={part}
                        isSelected={selectedPart === part}
                        onClick={() => onChange(part)}
                    />
                ))}
            </div>
        </div>
    );
}

function PartSelectorItem({
    name,
    isSelected = false,
    onClick,
}: {
    name: Parts;
    isSelected?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative z-10 px-8 py-2 rounded-full sub1_sb text-sm transition-colors duration-200 cursor-pointer"
        >
            {isSelected && (
                <motion.div
                    layoutId="part-indicator"
                    className="absolute inset-0 rounded-full bg-orange-main z-[-1]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}
            <span className={cn(isSelected ? "text-white" : "text-gray-5")}>{name}</span>
        </button>
    );
}
