"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowLeft from "@/assets/icons/circlearrow_left.svg";
import ArrowRight from "@/assets/icons/circlearrow_right.svg";
import EditDeleteMenu from "@/components/EditDeleteMenu";

interface GalleryInfoProps {
    galleryId: string;
    title: string;
    date: string;
    description: string[];
    photos: string[];
}

export default function GalleryInfo({
    galleryId,
    title,
    date,
    description,
    photos,
}: GalleryInfoProps) {
    const router = useRouter();
    const [idx, setIdx] = useState(0);

    const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
    const next = () => setIdx((i) => (i + 1) % photos.length);

    const doDelete = async () => {
        // TODO: 실제 API 호출
        console.log("Deleting gallery", galleryId);
        router.push("/gallery");
    };

    return (
        <section className="w-full bg-white pt-[120px] px-[190px] pb-[200px]">
            <div className="flex flex-col items-center gap-[79px]">
                {/* 사진 캐러셀 */}
                <div className="flex items-center gap-[32px]">
                    <button onClick={prev} className="w-[58px] h-[58px]">
                        <ArrowLeft />
                    </button>
                    <div className="w-[880px] h-[440px] overflow-hidden">
                        <img
                            src={photos[idx] || "/static/images/placeholder.png"}
                            alt={`${title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button onClick={next} className="w-[58px] h-[58px]">
                        <ArrowRight />
                    </button>
                </div>

                {/* 제목 · 작성일 · 메뉴 */}
                <div className="w-[880px] flex flex-col gap-[79px]">
                    <div className="w-full relative flex justify-between items-start">
                        <div className="flex flex-col gap-[2px]">
                            <h1 className="body1_sb text-gray-900">{title}</h1>
                            <span className="sub2_sb text-[#787471]">{date}</span>
                        </div>
                        <EditDeleteMenu
                            editUrl={`/gallery/${galleryId}/edit`}
                            onDelete={doDelete}
                            resourceName="활동 기록"
                        />
                    </div>

                    {/* 본문 */}
                    <div className="body3_m text-gray-700 space-y-2">
                        {description.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
