"use client";

import { useNews } from "@/api/gallery/useNews";
import NewsCards from "./components/NewsCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function NewsList() {
    const { data = [], isLoading, isError } = useNews();

    if (isLoading) return <p className="text-center text-gray-400">로딩 중...</p>;
    if (isError) return <p className="text-center text-red-500">에러 발생</p>;

    return (
        <section
            className="
        bg-[#111]       /* 섹션 배경을 전체 화면으로 */
        w-full
        overflow-visible
        pt-[120px]
        pb-[152px]
      "
        >
            {/* 내부 컨텐츠만 1440px 로 제한 */}
            <div className="mx-auto max-w-[1440px] px-0">
                <h2
                    className="
            text-2xl font-bold text-white
            h-[45px]
            mb-[72px]
            px-0
          "
                >
                    멋사의 최근 소식
                </h2>

                <div className="h-[490px] w-full overflow-visible px-0">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView="auto"
                        centeredSlides={true}
                        spaceBetween={32}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        slidesOffsetBefore={275}
                        slidesOffsetAfter={190}
                        className="!overflow-visible !px-0 !mx-0"
                    >
                        {data
                            .slice(0, 4) /* 최신 4개만 */
                            .map((item) => (
                                <SwiperSlide key={item.id} className="!w-[514px] !h-[490px] !px-0">
                                    <NewsCards item={item} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
