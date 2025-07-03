/* src/app/gallery/[galleryId]/components/RecordCard.tsx */

"use client";

import React from "react";
import Link from "next/link";

export interface RecordCardProps {
    id: string;
    title: string;
    description: string;
    date: string;
    thumbnailUrl?: string;
}

export default function RecordCard({
    id,
    title,
    description,
    date,
    thumbnailUrl,
}: RecordCardProps) {
    return (
        <Link href={`/gallery/${id}`} className="w-[332px] h-[323px] flex-shrink-0 flex flex-col">
            {/* 이미지 영역 */}
            {thumbnailUrl && (
                <img src={thumbnailUrl} alt={title} className="w-full h-[200px] object-cover" />
            )}

            {/* 이미지와 텍스트 사이 gap 16px */}
            <div className="mt-[16px] flex flex-col justify-between flex-1 p-0">
                <div>
                    <h3 className="sub2_sb text-[#414141] leading-tight text-base">{title}</h3>
                    <p
                        className="body4_m text-[#414141] mt-2 overflow-hidden"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {description}
                    </p>
                </div>

                {/* 제목+본문과 날짜 사이 gap 20px */}
                <p className="caption7_m text-[#787471] mt-[20px]">{date}</p>
            </div>
        </Link>
    );
}
