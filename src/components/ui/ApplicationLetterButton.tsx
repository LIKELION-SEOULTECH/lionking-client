"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

export function ApplicationLetterButton() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        setError("");
        setSubmitted(true);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative z-10 flex items-center justify-center gap-2 px-[25px] py-2.5 md:py-3 lg:py-3.5 sub2_sb rounded-full bg-orange-main/90 text-white backdrop-blur-md shadow-[0_0_40px_rgba(255,130,20,0.35)] ring-1 ring-white/10 transition-all duration-200 hover:bg-orange-main hover:shadow-[0_0_60px_rgba(255,130,20,0.6)] cursor-pointer"
            >
                <span>14기 모집 알림 신청</span>
                <ArrowRightIcon />
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        <motion.div
                            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md bg-white rounded-xl p-6 shadow-xl transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="mb-4">
                                <h2 className="sub2_sb text-gray-8">14기 모집 알림 신청</h2>
                                <p className="body5_r text-gray-4 mt-1">
                                    이메일을 등록하시면 14기 모집 시 가장 먼저 안내해드립니다.
                                </p>
                            </div>

                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="body5_r text-gray-7">
                                            이메일 주소
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="w-full px-4 py-2 border rounded-md body6_r text-gray-8 placeholder:text-gray-4 outline-none focus:ring-2 ring-orange-main transition-colors duration-200"
                                            placeholder="example@domain.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {error && <p className="text-sm text-red-500">{error}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-main text-white py-2 rounded-md text-sm hover:bg-orange-main/90 transition cursor-pointer"
                                    >
                                        알림 신청하기
                                    </button>
                                </form>
                            ) : (
                                <p className="text-green-600 text-center font-medium">
                                    알림 신청이 완료되었습니다. 감사합니다!
                                </p>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
