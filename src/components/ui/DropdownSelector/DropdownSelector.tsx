"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type DropdownSelectorProps<T extends string> = {
    value: T;
    onChange: (value: T) => void;
    options: T[];
    className?: string;
    dark?: boolean;
};

export default function DropdownSelector<T extends string>({
    value,
    onChange,
    options,
    className,
    dark = false,
}: DropdownSelectorProps<T>) {
    const triggerClass = cn(
        "flex items-center justify-between rounded-full px-5 py-2 body4_m cursor-pointer transition",
        dark
            ? "text-white bg-gray-5 hover:bg-gray-5/85"
            : "text-gray-5 bg-gray-2 hover:bg-gray-2/85"
    );

    const portalClass = cn(
        "z-50 min-w-[160px] rounded-[8px] shadow-sm p-1 rounded-[8px]",
        dark ? "bg-gray-5" : "bg-white"
    );

    const itemClass = cn(
        "flex items-center justify-between px-2 py-2 body5_4 rounded-[4px] cursor-pointer select-none focus:outline-none",
        dark
            ? "text-white hover:bg-gray-7 focus:bg-gray-6"
            : "text-gray-5 hover:bg-gray-1 focus:bg-gray-2"
    );

    return (
        <div className={cn(className)}>
            <Select.Root value={value} onValueChange={(val) => onChange(val as T)}>
                <Select.Trigger className={triggerClass}>
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
                            className={portalClass}
                        >
                            <Select.Viewport className="p-1.5">
                                {options.map((opt) => (
                                    <Select.Item key={opt} value={opt} className={itemClass}>
                                        <Select.ItemText>{opt}</Select.ItemText>
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
