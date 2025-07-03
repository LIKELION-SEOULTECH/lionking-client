"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import MobileProfileSection from "./MobileProfileSection";
import Button from "@/components/ui/Button";
import { navigationLinks } from "../navigationLinks";
import { ChevronRight } from "lucide-react";
import { Member } from "@/types";

type MobileNavigationProps = {
    isOpen: boolean;
    onClose: () => void;
    isLoggedIn: boolean;
    authenticatedUser: Member | undefined;
};

export default function MobileNavigation({
    isOpen,
    onClose,
    isLoggedIn,
    authenticatedUser,
}: MobileNavigationProps) {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleExpanded = (key: string) => {
        setExpandedItems((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const isActive = (href: string) => pathname === href;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-[9999] lg:hidden"
                        onClick={onClose}
                    />

                    <motion.nav
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "tween",
                            duration: 0.35,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="fixed right-0 top-[60px] h-[calc(100vh-60px)] w-[75%] max-w-sm bg-gray-8 z-[9999] overflow-y-auto lg:hidden"
                    >
                        <div className="p-3">
                            <ul className="space-y-2">
                                {navigationLinks.map((item) => (
                                    <li key={item.key}>
                                        {item.children ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleExpanded(item.key)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-colors",
                                                        "hover:bg-gray-7",
                                                        "text-gray-2 hover:text-orange-main",
                                                        isActive(item.href!) &&
                                                            "bg-gray-7 text-orange-main"
                                                    )}
                                                >
                                                    <span className="body5_r">{item.label}</span>
                                                    <ChevronRight
                                                        className={cn(
                                                            "w-5 h-5 transition-transform",
                                                            expandedItems.includes(item.key) &&
                                                                "rotate-90"
                                                        )}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {expandedItems.includes(item.key) && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                                                        >
                                                            {item.children.map((child) => (
                                                                <li key={child.key}>
                                                                    <Link
                                                                        href={child.href}
                                                                        className={cn(
                                                                            "block px-3 py-2.5 rounded-lg transition-colors",
                                                                            "text-gray-2 hover:bg-gray-7 hover:text-orange-main",
                                                                            isActive(child.href) &&
                                                                                "bg-gray-7 text-orange-main"
                                                                        )}
                                                                    >
                                                                        <span className="body5_r">
                                                                            {child.label}
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href!}
                                                className={cn(
                                                    "block px-3 py-2.5 rounded-lg transition-colors",
                                                    "text-gray-2 hover:bg-gray-7 hover:text-orange-main",
                                                    isActive(item.href!) &&
                                                        "bg-gray-7 text-orange-main"
                                                )}
                                            >
                                                <span className="body5_r">{item.label}</span>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 pt-4 border-t border-gray-6">
                                {isLoggedIn && authenticatedUser ? (
                                    <MobileProfileSection
                                        user={authenticatedUser}
                                        onSignout={() => async () => {
                                            await fetch("/api/logout", { method: "POST" });
                                            window.location.href = "/";
                                        }}
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        <Link href="/apply" className="block">
                                            <Button color="orange" type="button" className="w-full">
                                                지원하기
                                            </Button>
                                        </Link>

                                        <Link href="/login" className="block">
                                            <Button
                                                color="neutral"
                                                type="button"
                                                className="w-full"
                                            >
                                                로그인
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
}
