"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { profileDropdownActionMap } from "../Actions/components/ProfileDropdown/profileDropdownActionMap";
import { MobileProfileDropdownActionButtonGroup } from "./MobileProfileDropdownActionButton";
import type { Member } from "@/types";
import { ChevronRight } from "lucide-react";

type MobileProfileSectionProps = {
    user: Member;
    onSignout: () => void;
};

export default function MobileProfileSection({ user, onSignout }: MobileProfileSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonGroups = profileDropdownActionMap[user.role]({
        signout: onSignout,
    });

    return (
        <div className="space-y-4">
            <motion.div
                className="w-full flex items-center justify-between bg-gray-6 p-3 rounded-[8px] cursor-pointer"
                onClick={() => setIsExpanded((prev) => !prev)}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
            >
                <div className="flex items-center justify-between gap-3">
                    <motion.div className="relative overflow-hidden rounded-full size-10">
                        <Image
                            src={user.imageUrl ?? "/static/images/placeholder_profile.svg"}
                            alt={`${user.name}의 프로필 이미지`}
                            objectFit="cover"
                            fill
                        />
                    </motion.div>
                    <div className="flex flex-col items-start justify-center h-full text-white">
                        <p className="sub3_sb">{user.name}</p>
                        <p className="body6_r text-gray-2">{user.roleLabel}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.div>
            </motion.div>

            <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                            y: -10,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                            opacity: {
                                duration: 0.2,
                                ease: "easeOut",
                            },
                            y: {
                                duration: 0.2,
                                ease: "easeOut",
                            },
                        }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MobileProfileDropdownActionButtonGroup
                                buttonGroups={buttonGroups}
                                isAnimating={isExpanded}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
