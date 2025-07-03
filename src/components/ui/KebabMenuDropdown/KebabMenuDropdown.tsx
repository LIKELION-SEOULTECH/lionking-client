"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type KebabMenuDropdownItem = {
    label: string;
    onClick: () => void;
};

type KebabMenuDropdownProps = {
    items: KebabMenuDropdownItem[];
    className?: string;
    dark?: boolean;
};

export default function KebabMenuDropdown({
    items,
    className,
    dark = false,
}: KebabMenuDropdownProps) {
    const triggerClass = cn(
        "w-[32px] h-[32px] rounded-full flex items-center justify-center transition duration-200 cursor-pointer",
        dark ? "text-white hover:bg-gray-5/85" : "text-gray-5 hover:bg-gray-2/85"
    );

    const contentClass = cn(
        "z-50 min-w-[160px] rounded-[8px] shadow-xs p-1",
        dark ? "bg-gray-5 text-white" : "bg-white text-gray-5"
    );

    const itemClass = cn(
        "w-full flex items-center px-3 py-2 rounded-[4px] text-sm cursor-pointer select-none",
        dark ? "hover:bg-gray-7" : "hover:bg-gray-1/80"
    );

    return (
        <div className={cn(className)}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={cn(triggerClass, className)} aria-label="Open menu">
                        <MoreHorizontal size={18} />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content sideOffset={6} align="end" asChild>
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className={contentClass}
                        >
                            {items.map((item, idx) => (
                                <DropdownMenu.Item
                                    key={idx}
                                    className={itemClass}
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        item.onClick();
                                    }}
                                >
                                    {item.label}
                                </DropdownMenu.Item>
                            ))}
                        </motion.div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}
