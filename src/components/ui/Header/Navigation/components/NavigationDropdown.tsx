"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, AnimatePresence } from "motion/react";

type NavigationDropdownProps = {
    triggerLabel: string;
    links: { href: string; label: string }[];
};

export default function NavigationDropdown({ triggerLabel, links }: NavigationDropdownProps) {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.Trigger className="text-gray-2 subtitle-3 hover:text-orange-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main">
                {triggerLabel}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute z-10 w-48 bg-white shadow-lg rounded-md">
                <AnimatePresence>
                    {links.map(({ href, label }) => (
                        <DropdownItem key={href} href={href} label={label} />
                    ))}
                </AnimatePresence>
            </NavigationMenu.Content>
        </NavigationMenu.Root>
    );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
    return (
        <NavigationMenu.Item>
            <Link
                href={href}
                className="block px-4 py-2 text-gray-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
            >
                {label}
            </Link>
        </NavigationMenu.Item>
    );
}
