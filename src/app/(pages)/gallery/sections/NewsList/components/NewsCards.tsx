// src/app/(pages)/gallery/sections/NewsList/components/NewsCards.tsx
import Image from "next/image";
import { News } from "@/types";

interface NewsCardProps {
    item: News;
}

export default function NewsCards({ item }: NewsCardProps) {
    return (
        <div className="rounded-xl overflow-hidden bg-[#1c1c1c] text-white h-full flex flex-col">
            {/* 1) 이미지 */}
            <div className="relative h-[320px] w-full">
                <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
            </div>
            {/* 2) 텍스트 영역 */}
            <div className="p-4 px-4 pt-4 pb-2 flex flex-col flex-1">
                {/* 제목 + 날짜 (간격 mb-6 으로 늘림) */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold truncate">{item.title}</h3>
                    <span className="px-3 py-1 bg-gray-700/50 text-sm font-medium rounded-full text-white/60 whitespace-nowrap">
                        {item.date}
                    </span>
                </div>
                {/* 설명 */}
                <p className="text-base text-gray-300 leading-[30px] h-[60px] overflow-hidden">
                    {item.description}
                </p>
            </div>
        </div>
    );
}
