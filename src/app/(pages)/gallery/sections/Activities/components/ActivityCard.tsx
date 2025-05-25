"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { News } from "@/types";

interface Props {
    item: News;
}

export default function ActivityCard({ item }: Props) {
    return (
        <Link href={`/gallery/activity/${item.id}`} className="block w-[332px] h-[260px] group">
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-full h-full rounded-[12px] overflow-hidden"
            >
                {/* 1) 썸네일: 카드 전체 */}
                <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    sizes="332px"
                    className="object-cover"
                />

                {/* 2) 진한 검정 오버레이 (기본 50% 투명도) */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Hover 주황 오버레이 (불투명도 60%) */}
                <div className="absolute inset-0 bg-orange-main/0 group-hover:bg-orange-main/50 transition-colors duration-300" />

                {/* 3) 제목 + 날짜 (카드 상단, p-6으로 테두리 여유 확보) */}
                <div className="absolute top-0 left-0 right-0 flex flex-col p-6">
                    {/* 제목 (더 키운 폰트) */}
                    <p className="text-2xl font-bold text-white leading-snug line-clamp-2">
                        {item.title}
                    </p>
                    {/* 날짜 (제목 바로 밑, mt-2) */}
                    <span className="mt-2 text-base text-white/70">{item.date}</span>
                </div>
            </motion.div>
        </Link>
    );
}
