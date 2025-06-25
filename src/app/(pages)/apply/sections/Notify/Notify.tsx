// src/app/(pages)/apply/sections/Notify/Notify.tsx
"use client";

import React, { useState } from "react";
// 닫기 X 아이콘
import CloseIcon from "@/assets/icons/ic_close.svg";
// 오른쪽 화살표 아이콘 (알림 신청 버튼용)
import ArrowIcon from "@/assets/icons/ic_arrow_right_orange.svg";

export default function Notify() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 100px 아래에 위치한 알림 신청 버튼 */}
            <div className="mt-[100px] flex justify-center">
                <button
                    onClick={() => setOpen(true)}
                    className="
            sub2_sb flex items-center gap-[8px]
            w-[239px] h-[56px]
            px-[25px] py-[14px]
            bg-white text-gray-900 rounded-[60px]
            shadow hover:shadow-md transition
          "
                >
                    14기 모집 알림 신청
                    <ArrowIcon className="w-[28px] h-[28px]" />
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div
                        className="
              relative bg-white rounded-[20px]
              w-[700px] h-[224px]   /* 878×281의 약 80% 크기 유지 */
              pt-[29px] pb-[66px] px-[47px]
              shadow-xl
            "
                    >
                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-[29px] right-[47px] w-[28px] h-[28px] hover:opacity-80 transition-opacity"
                        >
                            <CloseIcon className="w-full h-full" />
                        </button>

                        {/* 타이틀: X 버튼 아래 9px, 중앙 정렬, 한 줄로 강제 */}
                        <h3
                            className="
                mt-[9px]
                w-full text-center
                head3_sb text-gray-900 text-[24px]
                whitespace-nowrap
              "
                        >
                            모집 기간이 되면 메일로 알려드릴게요!
                        </h3>

                        {/* 입력창 + 내부 알림받기 버튼 */}
                        <div className="mt-[40px] mx-auto flex items-center w-[600px] h-[64px] rounded-[16px] border border-gray-200">
                            <input
                                type="email"
                                placeholder="메일을 입력해주세요"
                                className="
                  flex-1 h-full
                  px-[16px] py-[9px]
                  placeholder-[#C4C4C4]
                  text-black               /* 입력 시 검정 글자로 표시 */
                  body3\\(new\\)_m text-[16px]
                  focus:outline-none
                "
                            />
                            <button
                                className="
                  sub2_sb
                  w-[113px] h-[45px]
                  px-[20px] py-[7px]
                  bg-[#FFF3EA] text-[#FF7710]
                  rounded-[10px]
                  ml-auto mr-[8px]
                "
                            >
                                알림 받기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
