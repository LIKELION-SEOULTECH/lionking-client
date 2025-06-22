"use client";

import React, { useEffect, useState } from "react";
import NoticeCard from "../NoticeCard";
import EmptyState from "../EmptyState";

interface Notice {
    id: number;
    title: string;
    createdAt: string;
}

export default function NoticeList() {
    const [notices, setNotices] = useState<Notice[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/notices");
                if (!res.ok) throw new Error("Network response was not ok");
                const data: Notice[] = await res.json();
                setNotices(data);
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <p className="text-center p-4">로딩 중…</p>;
    if (isError)
        return (
            <p className="text-center p-4 text-red-500">
                데이터를 불러오는 중 에러가 발생했습니다.
            </p>
        );
    if (!notices || notices.length === 0) return <EmptyState />;

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left">No.</th>
                    <th className="p-3 text-left">제목</th>
                    <th className="p-3 text-left">작성일</th>
                </tr>
            </thead>
            <tbody>
                {notices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                ))}
            </tbody>
        </table>
    );
}
