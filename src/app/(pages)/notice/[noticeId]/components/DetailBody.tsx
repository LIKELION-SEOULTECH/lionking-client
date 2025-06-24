// notice/[noticeId]/components/DetailBody.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DownloadIcon from "@/assets/icons/download.svg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Attachment = {
    name: string;
    size: string;
    url: string;
};

interface DetailBodyProps {
    content: string[];
    attachment?: Attachment;
}

export default function DetailBody({ content, attachment }: DetailBodyProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const router = useRouter();
    const { noticeId } = useParams() as { noticeId: string };

    const handleEdit = () => {
        router.push(`/notice/${noticeId}/edit`);
    };

    const handleDeleteClick = () => {
        setDropdownOpen(false);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        // TODO: 실제 삭제 로직 호출
        setDeleteModalOpen(false);
        // 예: router.refresh() 또는 router.push("/notice");
    };

    return (
        <>
            <div className="w-screen relative">
                <div className="pt-[150px] pb-[120px] w-[1060px] mx-auto relative">
                    {/* 우측 상단: 점 세 개 아이콘 */}
                    <div className="absolute top-[80px] right-0">
                        <HiOutlineDotsHorizontal
                            className="w-[24px] h-[24px] text-gray-600 cursor-pointer"
                            onClick={() => setDropdownOpen((o) => !o)}
                        />
                        {dropdownOpen && (
                            <div
                                className="absolute top-[calc(24px+3px)] right-0
                           w-[154px] h-[88px] bg-white rounded-lg shadow-md
                           flex flex-col items-center justify-evenly"
                            >
                                <button
                                    className="w-[138px] body4_m text-gray-900 text-left
                             px-4 py-2 hover:bg-gray-100 rounded"
                                    onClick={handleEdit}
                                >
                                    수정하기
                                </button>
                                <button
                                    className="w-[138px] body4_m text-gray-900 text-left
                             px-4 py-2 hover:bg-gray-100 rounded"
                                    onClick={handleDeleteClick}
                                >
                                    삭제하기
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 본문 단락 */}
                    {content.map((paragraph, idx) => (
                        <p
                            key={idx}
                            className="body3(new)_m text-lg mb-6 text-gray-700 leading-relaxed"
                        >
                            {paragraph}
                        </p>
                    ))}

                    {/* 첨부파일 바 */}
                    {attachment && (
                        <div
                            className="mt-[60px] w-[1060px] h-[83px] bg-gray-100
                         rounded-lg flex items-center justify-between px-4"
                        >
                            <div>
                                <p className="sub2_sb text-gray-900">{attachment.name}</p>
                                <p className="body5_r text-gray-500">{attachment.size}</p>
                            </div>
                            <a href={attachment.url} download>
                                <DownloadIcon
                                    className="w-[40px] h-[40px]
                                          text-gray-600 hover:text-gray-800"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg w-[320px]">
                        <p className="body3(new)_m text-gray-800 mb-4">
                            게시물을 정말 삭제하시겠습니까?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="body4_m text-gray-700 px-4 py-2 hover:bg-gray-100 rounded"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="body4_m text-white bg-red-600 px-4 py-2 hover:bg-red-700 rounded"
                                onClick={confirmDelete}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
