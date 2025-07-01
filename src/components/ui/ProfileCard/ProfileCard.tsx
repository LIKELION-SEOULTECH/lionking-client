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
import Link from "next/link";

export default function ProfileCard({ member, size, transparency }: ProfileCardProps) {
    const { id } = member;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/about/members/${id}`} passHref>
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(ProfileCardVariants({ size, transparency }))}
            >
                {size !== "large" && (
                    <motion.div
                        className="absolute inset-0 z-10 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0.4 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <div className={cn(ProfileCardImageVariants({ size }))}>
                    {size !== "large" && (
                        <motion.div
                            className="absolute inset-0 z-10 flex items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                y: isHovered ? 0 : 20,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className="flex items-center justify-center hover:underline">
                                <span className={cn(size === "small" ? "sub4_sb" : "sub2_sb")}>
                                    프로필 보기
                                </span>
                                <ArrowUpRightIcon />
                            </div>
                        </motion.div>
                    )}

                    <Image src="/static/images/default_profile.svg" alt="Profile Image" fill />
                </div>

                <MembersGridItemInfo member={member} size={size} />
            </motion.div>
        </Link>
    );
}

function MembersGridItemInfo({ member, size }: ProfileCardInfoProps) {
    const { id, name, profileIntro, major, userTags } = member;
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/about/members/${id}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: name,
                    text: profileIntro,
                    url,
                });
            } catch (err) {
                console.error("공유 실패:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                alert(`URL 복사에 실패했습니다! ${err}`);
            }
        }
    };

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
                            <p className="text-white head5_sb">{name}</p>
                            <button onClick={handleShare} className="cursor-pointer">
                                <ShareIcon />
                            </button>
                        </div>
                        <p className="body3_r text-gray-1">{major}</p>
                    </>
                ) : (
                    <>
                        <p className="text-white sub1_sb">{name}</p>
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
