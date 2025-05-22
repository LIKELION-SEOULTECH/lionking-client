"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import ArrowUpRightIcon from "@/assets/about/arrow-up-right.svg";
import ShareIcon from "@/assets/about/ic_share_white.svg";

import type { ProfileCardProps, ProfileCardInfoProps } from "./types";
import {
    ProfileCardVariants,
    ProfileCardImageVariants,
    ProfileCardInfoGlobalLayoutVariants,
    ProfileCardInfoTextLayoutVariants,
} from "./ProfileCardVariants";

export default function ProfileCardDefault({
    name,
    major,
    userTags,
    size,
    transparency,
}: ProfileCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(ProfileCardVariants({ size, transparency }))}
        >
            <motion.div
                className="absolute inset-0 bg-black z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.4 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className={cn(ProfileCardImageVariants({ size }))}>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-center hover:underline">
                        <span className={cn(size === "small" ? "sub4_sb" : "sub2_sb")}>
                            프로젝트 보기
                        </span>
                        <ArrowUpRightIcon />
                    </div>
                </motion.div>

                <Image src="/static/images/placeholder.png" alt="Profile Image" fill />
            </div>

            <MembersGridItemInfo name={name} major={major} userTags={userTags} size={size} />
        </motion.div>
    );
}

function MembersGridItemInfo({ name, major, userTags, size }: ProfileCardInfoProps) {
    return (
        <div className={cn(ProfileCardInfoGlobalLayoutVariants({ size }))}>
            <div className="w-full flex items-center justify-center gap-2.5">
                {userTags?.map((userTag, index) => (
                    <MembersGridItemTag key={index} userTag={userTag} />
                ))}
            </div>

            <div className={cn(ProfileCardInfoTextLayoutVariants({ size }))}>
                {size === "large" ? (
                    <>
                        <div className="flex items-center justify-center gap-2">
                            <p className="head5_sb text-white">{name}</p>
                            <ShareIcon />
                        </div>
                        <p className="body3_r text-gray-1">{major}</p>
                    </>
                ) : (
                    <>
                        <p className="sub1_sb text-white">{name}</p>
                        <p className="body5_r text-gray-1">{major}</p>
                    </>
                )}
            </div>
        </div>
    );
}

function MembersGridItemTag({ userTag }: { userTag: string }) {
    return (
        <div className="flex items-center justify-center px-2.5 py-1.5 border border-orange-main text-orange-main rounded-[8px] body6_r">
            {userTag}
        </div>
    );
}
