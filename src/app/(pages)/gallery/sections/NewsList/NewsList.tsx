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
        bg-[#111] 
        overflow-visible
        mx-auto
        w-[1440px] 
        h-[879px] 
        pt-[120px] 
        pb-[152px]
        px-0             /* 여긴 무조건 0 */
      "
        >
            <h2
                className="
          text-2xl font-bold text-white 
          h-[45px] 
          mb-[72px]
          px-0           /* 여기도 0 */
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
                    {data.map((item) => (
                        <SwiperSlide key={item.id} className="!w-[514px] !h-[490px] !px-0">
                            <NewsCards item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
