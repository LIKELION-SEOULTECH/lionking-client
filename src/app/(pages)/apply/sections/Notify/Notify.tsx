"use client";

import React, { useState } from "react";
import CloseIcon from "@/assets/icons/ic_close.svg";
import ArrowIcon from "@/assets/icons/ic_arrow_right_orange.svg";

export default function Notify() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        // 간단한 입력 검증
        if (!email.trim()) {
            setError("이메일을 입력해주세요.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/recruit/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // 에러 응답 처리
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message ?? "알림 신청에 실패했습니다.");
            }

            // 성공
            alert("알림 신청이 완료되었습니다! ✅");
            setOpen(false);
            setEmail("");
        } catch (e) {
            setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

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
              w-[700px] h-[224px]
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

                        {/* 타이틀 */}
                        <h3 className="mt-[9px] w-full text-center head3_sb text-gray-900 text-[24px] whitespace-nowrap">
                            모집 기간이 되면 메일로 알려드릴게요!
                        </h3>

                        {/* 입력 + 버튼 */}
                        <div className="mt-[40px] mx-auto flex flex-col items-center">
                            <div className="flex items-center w-[600px] h-[64px] rounded-[16px] border border-gray-200">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="메일을 입력해주세요"
                                    className="
                    flex-1 h-full
                    px-[16px] py-[9px]
                    placeholder-[#C4C4C4] text-black
                    body3\\(new\\)_m text-[16px]
                    focus:outline-none
                  "
                                />
                                <button
                                    onClick={handleSubscribe}
                                    disabled={loading}
                                    className="
                    sub2_sb
                    w-[113px] h-[45px]
                    px-[20px] py-[7px]
                    bg-[#FFF3EA] text-[#FF7710]
                    rounded-[10px]
                    ml-auto mr-[8px]
                    disabled:opacity-50
                  "
                                >
                                    {loading ? "잠시만요..." : "알림 받기"}
                                </button>
                            </div>

                            {/* 에러 메시지 */}
                            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
