/* src/app/gallery/[galleryId]/components/RecordList.tsx */

"use client";

import React from "react";
import RecordCard, { RecordCardProps } from "./RecordCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export interface RecordListProps {
    records: RecordCardProps[];
}

export default function RecordList({ records }: RecordListProps) {
    // 중앙 정렬을 위한 offset 계산
    const slideWidth = 332;
    const containerWidth = 1440;
    const offset = (containerWidth - slideWidth) / 2;

    return (
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#F6F6F6] overflow-visible">
            {/* 전체 상하 패딩: pt-[72px]로 제목과 카드 사이 72px 확보 */}
            <div className="pt-[72px] pb-[120px]">
                <div className="max-w-[1440px] mx-auto relative">
                    {/* 제목 */}
                    <h2 className="head4_b absolute top-0 left-[200px]">지난 기록 더 보기</h2>

                    {/* 카드 리스트: 제목 아래로 mt-[72px] 적용 */}
                    <div className="mt-[0px] h-[323px] overflow-visible">
                        <Swiper
                            modules={[Autoplay]}
                            initialSlide={2}
                            slidesPerView={3}
                            centeredSlides={true}
                            spaceBetween={32}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            speed={800}
                            slidesOffsetBefore={offset}
                            slidesOffsetAfter={offset}
                            className="!overflow-visible"
                        >
                            {records.map((rec) => (
                                <SwiperSlide key={rec.id} className="!w-[332px] !h-[323px]">
                                    <RecordCard {...rec} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
