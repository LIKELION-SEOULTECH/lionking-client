"use client";

import React from "react";
import GalleryInfo from "./components/GalleryInfo";
import RecordList from "./components/RecordList";
import newsMock from "@/__mocks__/newsMock";

interface GalleryDetailPageProps {
    params: {
        galleryId: string;
    };
}

export default function GalleryDetailPage({ params: { galleryId } }: GalleryDetailPageProps) {
    // TODO: 실제 API 호출로 대체
    const gallery = {
        title: "첫 번째 정기 세션",
        date: "25.01.01",
        description: [
            "기다와 설렘 속에 시작된 첫 세션!",
            "드디어 멋사 13기의 첫걸음을 내딛었습니다! 💪",
            "각 파트별로 모여 기초 지식을 다지고, 앞으로의 방향을 공유하는 시간을 가졌어요.",
            "앞으로도 멋진 프로젝트와 성장 스토리가 이어질 예정이니 기대 많이 해주세요! 🧡",
        ],
        photos: ["/static/images/about_intro.png", "/static/images/beach.jpeg"] as string[],
    };

    return (
        <main className="w-full bg-white">
            {/* GalleryInfo (흰 배경) */}
            <section className="max-w-screen-lg mx-auto px-6 py-8">
                <GalleryInfo
                    galleryId={galleryId}
                    title={gallery.title}
                    date={gallery.date}
                    description={gallery.description}
                    photos={gallery.photos}
                />
            </section>

            {/* 지난 기록 더 보기 (회색 배경) */}
            <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#F6F6F6]">
                <section className="max-w-screen-lg mx-auto px-6 py-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">지난 기록 더 보기</h2>
                    <RecordList records={newsMock} />
                </section>
            </div>
        </main>
    );
}
