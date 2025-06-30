"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import DownloadIcon from "@/assets/icons/download.svg";
import EditDeleteMenu from "@/components/EditDeleteMenu";

type Attachment = {
    name: string;
    size: string;
    url: string;
};

interface DetailBodyProps {
    content: string[];
    attachment?: Attachment;
    resourceName?: string;
}

export default function DetailBody({
    content,
    attachment,
    resourceName = "게시물",
}: DetailBodyProps) {
    // const router = useRouter();
    const { noticeId } = useParams() as { noticeId: string };

    const handleDelete = async () => {
        // TODO: 실제 삭제 로직 호출
        // 예: await api.deleteNotice(noticeId);
        // 삭제 후 목록 페이지로 이동
        // router.push("/notice");
    };

    return (
        <div className="w-screen relative">
            <div className="flex flex-col gap-[50px] px-[190px] pt-[80px] pb-[120px]">
                {/* 우측 상단: 수정/삭제 메뉴 */}
                <div className="self-end relative">
                    <EditDeleteMenu
                        editUrl={`/notice/${noticeId}/edit`}
                        onDelete={handleDelete}
                        resourceName={resourceName}
                    />
                </div>

                {/* 본문 + 첨부파일 영역 */}
                <div className="flex flex-col gap-[70px]">
                    {/* 본문 영역 */}
                    <div>
                        {content.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className="body3(new)_m text-lg text-gray-700 leading-relaxed mb-6 p-0"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* 첨부파일 바 */}
                    {attachment && (
                        <div className="bg-gray-100 rounded-lg flex items-center justify-between py-[14px] px-[28px]">
                            <div>
                                <p className="body3_m text-gray-900">{attachment.name}</p>
                                <p className="text-gray-500 !text-[10px]">{attachment.size}</p>
                            </div>
                            <a href={attachment.url} download className="ml-auto">
                                <DownloadIcon className="w-[40px] h-[40px] text-gray-600 hover:text-gray-800" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
