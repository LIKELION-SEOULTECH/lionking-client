"use client";

import Image from "next/image";
import { motion } from "motion/react";
import useHoverAnimation from "@/hooks/animations/useHoverAnimation";
import type { News } from "@/types";
import { extractSummary, getFullS3Url } from "@/lib/utils";
import Link from "next/link";

export default function NewsCard(news: News) {
    const { ref } = useHoverAnimation<HTMLDivElement>();
    const thumbnail = getFullS3Url(news.contentMedia[0]?.s3Key) || "/static/images/placeholder.png";

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col w-[330px] bg-gray-6 hover:bg-gray-6/50 rounded-[20px] overflow-hidden cursor-pointer transition-colors duration-200"
        >
            <Link className="w-full h-full" href={`/gallery/${news.id}`}>
                <NewsCardTopImage imageSrc={thumbnail} />

                <NewsCardBottomInformation news={news} />
            </Link>
        </motion.div>
    );
}

function NewsCardTopImage({ imageSrc }: { imageSrc: string }) {
    return (
        <div className="flex items-center justify-center w-full h-[186px]">
            <Image
                src={imageSrc}
                alt="News Image"
                className="object-cover w-full h-full"
                height={186}
                width={330}
                draggable={false}
            />
        </div>
    );
}

type NewsCardBottomInformationProps = {
    news: News;
};

function NewsCardBottomInformation({ news }: NewsCardBottomInformationProps) {
    return (
        <div className="flex flex-col w-full gap-[3px] items-start justify-center px-4.5 py-5">
            <div className="flex items-center justify-between w-full">
                <p className="text-white body3_m">{extractSummary(news.title, 13)}</p>

                <NewsDateBadge date="" />
            </div>

            <p className="body5_r text-gray-2">{extractSummary(news.content, 23)}</p>
        </div>
    );
}

function NewsDateBadge({ date }: { date: string }) {
    return (
        <div className="flex items-center justify-center px-2 py-1 bg-[#191919] rounded-[12px]">
            <p className="text-white body6_r">{date}</p>
        </div>
    );
}
