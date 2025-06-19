"use client";

import { useState, useMemo } from "react";
import { useNews } from "@/api/gallery/useNews";
import ActivityCard from "./components/ActivityCard";

const PAGE_SIZE = 9;
const MAX_PAGE_BUTTON = 5;

export default function ActivitiesSection() {
    const { data = [], isLoading, isError } = useNews();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
    const pageCount = Math.min(MAX_PAGE_BUTTON, totalPages);

    const pageData = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return data.slice(start, start + PAGE_SIZE);
    }, [data, page]);

    if (isLoading) return <p className="text-center text-gray-400">로딩 중…</p>;
    if (isError) return <p className="text-center text-red-500">오류 발생</p>;

    return (
        <section className="w-full bg-[#111] pt-[200px] pb-[200px]">
            <div className="max-w-[1440px] mx-auto px-[190px]">
                {/* 내부 1,060px 박스 */}
                <div className="w-[1060px] mx-auto">
                    {/* 제목 */}
                    <h2 className="text-2xl font-bold text-white mb-[72px]">
                        멋사의 최근 활동 톺아보기
                    </h2>

                    {/* 3 × 3 그리드 */}
                    <div className="grid grid-cols-3 gap-[32px]">
                        {pageData.map((item) => (
                            <ActivityCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="mt-[60px] flex justify-center gap-[24px] text-white">
                        {[...Array(pageCount)].map((_, idx) => {
                            const n = idx + 1;
                            return (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`text-lg ${
                                        page === n
                                            ? "text-orange-main font-semibold"
                                            : "hover:text-orange-main"
                                    }`}
                                >
                                    {n}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
