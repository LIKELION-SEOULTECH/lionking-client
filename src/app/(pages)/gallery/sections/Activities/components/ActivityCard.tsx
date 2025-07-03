"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { News } from "@/types";
import { getFullS3Url } from "@/lib/utils";

export default function ActivityCard(news: News) {
    const thumbnail = getFullS3Url(news.contentMedia[0]?.s3Key) || "/static/images/placeholder.png";

    return (
        <Link href={`/gallery/${news.id}`} className=" block w-full h-65 group">
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-full h-full rounded-[20px] overflow-hidden"
            >
                <div className="relative w-full h-full overflow-hidden">
                    <Image src={thumbnail} alt={news.title} fill />
                </div>

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 transition-colors duration-300 bg-orange-main/0 group-hover:bg-orange-main/50" />

                <div className="absolute top-0 left-0 right-0 flex flex-col p-6">
                    <p className="text-white sub2_sb break-keep">{news.title}</p>
                </div>
            </motion.div>
        </Link>
    );
}
