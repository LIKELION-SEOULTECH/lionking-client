"use client";

import React from "react";
import Icons from "@/assets/banner/notice/icons.svg";

export default function NoticeBanner() {
    return (
        <div className="relative pt-[62px] w-screen h-[352px] bg-gray-1 overflow-hidden flex justify-center items-center">
            <div className="w-full max-w-[1100px] h-full px-6 flex items-center justify-between relative">
                <div className="z-10 flex flex-col">
                    <p className="head3_sb text-gray-8">멋쟁이사자처럼의</p>
                    <p className="head3_sb text-gray-8">
                        주요 <span className="text-orange-main">공지사항</span>을 알려드립니다
                    </p>
                </div>
                <Icons className="absolute -right-10 z-0 pointer-events-none" />
            </div>
        </div>
    );
}
