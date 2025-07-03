"use client";

import { useRouter, useParams } from "next/navigation";
import DownloadIcon from "@/assets/icons/download.svg";
import EditDeleteMenu from "@/components/EditDeleteMenu";

type Attachment = { name: string; size: string; url: string };

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
    const router = useRouter();
    const { noticeId } = useParams() as { noticeId: string };

    const handleDelete = async () => {
        if (!confirm(`${resourceName}을(를) 정말 삭제하시겠습니까?`)) return;

        const res = await fetch(`/api/notice/${noticeId}`, {
            method: "DELETE",
            credentials: "include", // 쿠키 전송
        });

        if (!res.ok) {
            const { message } = await res.json().catch(() => ({}));
            alert(`삭제 실패: ${message || res.status}`);
            return;
        }

        // 삭제 성공 후 목록 페이지로 이동
        router.push("/notice");
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto relative">
            <div className="flex flex-col gap-[50px] px-6 lg:px-0 pt-[80px] pb-[120px]">
                <div className="self-end relative">
                    <EditDeleteMenu
                        editUrl={`/notice/${noticeId}/edit`}
                        onDelete={handleDelete}
                        resourceName={resourceName}
                    />
                </div>

                <div className="flex flex-col gap-[70px]">
                    <div>
                        {content.map((para, idx) => (
                            <p key={idx} className="text-lg text-gray-700 mb-6">
                                {para}
                            </p>
                        ))}
                    </div>

                    {attachment && (
                        <div className="bg-gray-100 rounded-lg flex items-center justify-between py-[14px] px-[28px]">
                            <div>
                                <p className="text-gray-900">{attachment.name}</p>
                                <p className="text-gray-500 text-[10px]">{attachment.size}</p>
                            </div>
                            <a
                                href={attachment.url}
                                download={attachment.name}
                                target="_blank"
                                className="ml-auto"
                            >
                                <DownloadIcon className="w-[40px] h-[40px] text-gray-600 hover:text-gray-800" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
