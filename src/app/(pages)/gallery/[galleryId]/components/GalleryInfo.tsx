"use client";

import React, { useState } from "react";
import ArrowLeft from "@/assets/icons/circlearrow_left.svg";
import ArrowRight from "@/assets/icons/circlearrow_right.svg";
import { News } from "@/types";
import { getFullS3Url } from "@/lib/utils";
import GalleryEditButton from "./GalleryEditButton";

interface GalleryInfoProps {
    gallery: News;
}

export default function GalleryInfo({ gallery }: GalleryInfoProps) {
    const [idx, setIdx] = useState(0);

    const prev = () =>
        setIdx((i) => (i - 1 + gallery.contentMedia.length) % gallery.contentMedia.length);
    const next = () => setIdx((i) => (i + 1) % gallery.contentMedia.length);

    return (
        <section className="w-full bg-white">
            <div className="w-full max-w-[1100px] flex flex-col items-center gap-20 pt-15">
                <div className="w-full flex items-center gap-4">
                    <button onClick={prev} className="scale-[0.6] lg:scale-[0.8] cursor-pointer">
                        <ArrowLeft />
                    </button>
                    <div className="w-full h-auto min-h-80 overflow-hidden">
                        <img
                            src={
                                getFullS3Url(gallery.contentMedia[idx].s3Key) ||
                                "/static/images/placeholder.png"
                            }
                            alt={`${gallery.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button onClick={next} className="scale-[0.6] lg:scale-[0.8] cursor-pointer">
                        <ArrowRight />
                    </button>
                </div>

                <div className="w-full flex flex-col gap-8">
                    <div className="w-full relative flex justify-between items-start">
                        <div className="flex flex-col gap-[2px]">
                            <h1 className="body2_sb text-black">{gallery.title}</h1>
                            {/* <span className="sub2_sb text-[#787471]">{date}</span> */}
                        </div>
                        <GalleryEditButton galleryId={gallery.id} />
                    </div>

                    <p className="body3_r text-gray-6">{gallery.content}</p>
                </div>
            </div>
        </section>
    );
}
