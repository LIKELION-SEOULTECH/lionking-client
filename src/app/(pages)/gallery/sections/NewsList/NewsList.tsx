"use client";

import NewsCards from "./components/NewsCards";
import { useNews } from "@/api/gallery/useNews";

export default function NewsList() {
    const { data = [], isLoading, isError } = useNews();

    if (isLoading) return <p>로딩 중...</p>;
    if (isError) return <p>에러 발생</p>;

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-white mb-8">멋사의 최근 소식</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <NewsCards key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
