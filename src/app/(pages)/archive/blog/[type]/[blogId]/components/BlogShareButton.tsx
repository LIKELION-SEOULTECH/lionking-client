"use client";

import { useState } from "react";
import { LinkIcon, CheckIcon } from "lucide-react";

type BlogShareButtonProps = {
    currentBlogId: number | string;
    title?: string;
    description?: string;
};

export default function BlogShareButton({
    currentBlogId,
    title,
    description,
}: BlogShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/archive/blog/${currentBlogId}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url,
                });
            } catch (err) {
                console.error("공유 실패:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                alert(`URL 복사에 실패했습니다! ${err}`);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center gap-3">
            <p className="body5_r text-black">내용이 도움되었다면?</p>

            <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-2 text-gray-4 sub3_sb hover:bg-gray-2/70 rounded-full transition-colors duration-200 cursor-pointer"
            >
                <span>{copied ? "링크 복사됨!" : "공유하기"}</span>
                {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <LinkIcon />}
            </button>
        </div>
    );
}
