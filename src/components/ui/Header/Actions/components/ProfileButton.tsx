"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProfileDropdown from "./ProfileDropdown";
import ProfileEmpty from "@/assets/profile_empty.svg";

export default function ProfileButton() {
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
                cancelClose();
                setIsOpen(true);
            }}
            onMouseLeave={delayedClose}
        >
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex justify-start items-center gap-2 focus:outline-none"
            >
                <ProfileEmpty />
                <div className="sub5_sb">김사자</div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-7 min-w-[241px]"
                    >
                        <ProfileDropdown
                            name="김사자"
                            role="운영진"
                            imageSrc="/static/images/placeholder.png"
                            onClicks={{
                                myPage: () => {
                                    console.log("마이페이지");
                                    setIsOpen(false);
                                },
                                logout: () => {
                                    console.log("로그아웃");
                                    setIsOpen(false);
                                },
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
