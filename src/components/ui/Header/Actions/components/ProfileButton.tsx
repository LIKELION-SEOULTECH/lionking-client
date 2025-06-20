"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProfileDropdown from "./ProfileDropdown";
import ProfileEmpty from "@/assets/profile_empty.svg";
import { cn } from "@/lib/utils";

type ProfileButtonProps = {
    isMobile?: boolean;
};

export default function ProfileButton({ isMobile = false }: ProfileButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const delayedClose = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    const cancelClose = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <div
            className="relative"
            ref={containerRef}
            onMouseEnter={() => {
                if (!isMobile) {
                    cancelClose();
                    setIsOpen(true);
                }
            }}
            onMouseLeave={() => {
                if (!isMobile) {
                    delayedClose();
                }
            }}
        >
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    "flex justify-start items-center gap-2 focus:outline-none",
                    isMobile && "gap-1"
                )}
            >
                <ProfileEmpty className={cn(isMobile && "w-8 h-8")} />
                <div className={cn("sub5_sb", isMobile && "hidden sm:block text-sm")}>김사자</div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute right-0 top-full mt-7 min-w-[241px]",
                            isMobile && "mt-3 min-w-[200px]"
                        )}
                    >
                        <ProfileDropdown
                            member={{
                                id: 1,
                                name: "김먀옹",
                                major: "인공지능학과",
                                position: "프론트엔드",
                                role: "운영진",
                                userTags: ["프론트엔드", "운영진"],
                            }}
                            onClicks={{
                                signout: () => alert("ㅂ2"),
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
