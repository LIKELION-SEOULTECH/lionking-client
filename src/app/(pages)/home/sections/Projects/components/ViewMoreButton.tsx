"use client";

import Link from "next/link";
import LeftArrow from "@/assets/ic_arrow_right_white.svg";
import Appear from "@/components/animations/Appear";

export default function ViewMoreButton() {
    return (
        <Appear once={false}>
            <Link href="/projects">
                <button className="flex items-center justify-center gap-1 px-5 py-3 text-white transition-colors duration-200 rounded-full cursor-pointer bg-gray-7 hover:bg-gray-7/60">
                    <span className="sub3_sb">프로젝트 더보기</span>
                    <LeftArrow />
                </button>
            </Link>
        </Appear>
    );
}
