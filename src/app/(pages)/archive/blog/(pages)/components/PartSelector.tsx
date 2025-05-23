"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "motion/react";
import { PartFilters } from "@/types";

const partOptions: PartFilters[] = ["파트", "기획", "디자인", "프론트엔드", "백엔드", "AI"];

type PartSelectorProps = {
    value: PartFilters;
    onChange: (value: PartFilters) => void;
};

export default function PartSelector({ value, onChange }: PartSelectorProps) {
    return (
        <div className="w-full flex items-center justify-start lg:justify-end">
            <Select.Root value={value} onValueChange={(val) => onChange(val as PartFilters)}>
                <Select.Trigger className="flex items-center justify-between rounded-sm lg:rounded-full px-5 py-2 body4_m text-gray-4 bg-gray-2 hover:bg-gray-3/70 cursor-pointer transition">
                    <Select.Value />
                    <Select.Icon className="ml-[2px]">
                        <ChevronDown size={18} />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content sideOffset={6} position="popper">
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="z-50 min-w-[160px] rounded-[8px] bg-white shadow-sm"
                        >
                            <Select.Viewport className="p-1">
                                {partOptions.map((part) => (
                                    <Select.Item
                                        key={part}
                                        value={part}
                                        className="flex items-center justify-between px-3 py-2 body5_4 text-gray-5 hover:bg-gray-1 rounded cursor-pointer select-none focus:outline-none focus:bg-gray-2"
                                    >
                                        <Select.ItemText>{part}</Select.ItemText>
                                        <Select.ItemIndicator>
                                            <Check size={14} />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </motion.div>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}
