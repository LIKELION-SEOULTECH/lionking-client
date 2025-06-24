"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 라우팅용 추가
import ImgWriteIcon from "@/assets/icons/img_write.svg";
import noticeMock, { NoticeMock } from "@/__mocks__/noticeMock";
import AttachmentIcon from "@/assets/icons/attachment.svg";

export default function NoticeList() {
    const router = useRouter(); // ✅

    const [notices, setNotices] = useState<NoticeMock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;

    useEffect(() => {
        setNotices(noticeMock);
        setIsLoading(false);
    }, []);

    const important = notices.filter((n) => n.isImportant);
    const normal = notices.filter((n) => !n.isImportant);
    const ordered = [...important, ...normal];

    const totalPages = Math.max(1, Math.ceil(ordered.length / PAGE_SIZE));
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const pagedNotices = ordered.slice(startIdx, startIdx + PAGE_SIZE);

    return (
        <div className="bg-white w-full min-h-screen md:aspect-[1440/1100]">
            <div className="w-full max-w-[1100px] mx-auto px-4">
                {/* 1) 배너로부터 120px 아래 */}
                <div className="mt-[120px]" />

                {/* 2) 헤더 */}
                <div className="grid grid-cols-[80px_1fr_140px] h-[63px] bg-gray-100 text-gray-800 font-semibold rounded items-center text-[24px] border-t border-black/20 border-b border-black/20">
                    <div className="text-center text-[20px]">No.</div>
                    <div className="text-left pl-36">제목</div>
                    <div className="text-center text-[20px]">작성일</div>
                </div>

                {/* 3) 로딩 */}
                {isLoading && (
                    <div className="text-center py-16 text-gray-500 text-sm">불러오는 중...</div>
                )}

                {/* 4) 리스트 */}
                {!isLoading &&
                    (pagedNotices.length > 0 ? (
                        pagedNotices.map((notice, idx) => (
                            <div
                                key={notice.id}
                                className="grid grid-cols-[80px_1fr_140px] items-center h-[84px] border-t border-black/20 border-b border-black/20"
                            >
                                {/* No. */}
                                <div className="flex items-center justify-center text-[20px]">
                                    {notice.isImportant ? (
                                        <span className="w-[67px] h-[40px] flex items-center justify-center bg-orange-main text-white text-[20px] font-semibold rounded-full">
                                            중요
                                        </span>
                                    ) : (
                                        <span className="text-gray-600">
                                            {ordered.length - (startIdx + idx)}
                                        </span>
                                    )}
                                </div>

                                {/* 제목 */}
                                <div
                                    onClick={() => router.push(`/notice/${notice.id}`)} // ✅ 클릭 시 상세로
                                    className="flex items-center text-gray-800 pl-[27px] font-bold text-[24px] cursor-pointer hover:underline"
                                >
                                    <span>{notice.title}</span>
                                    {notice.hasAttachment && (
                                        <AttachmentIcon className="w-[30px] h-[30px] ml-2" />
                                    )}
                                </div>

                                {/* 작성일 */}
                                <div className="text-center text-gray-600 text-[20px]">
                                    {notice.createdAt}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center py-32 mt-12">
                            <ImgWriteIcon className="w-[96px] h-[96px] mb-2" />
                            <p className="text-gray-700 text-sm md:text-base">
                                아직 작성한 글이 없어요!
                            </p>
                        </div>
                    ))}

                {/* 5) 페이지네이션 */}
                <div className="flex justify-center mt-[60px] space-x-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`text-[24px] ${
                                page === currentPage ? "text-black" : "text-black opacity-40"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
