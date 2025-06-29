"use client";

import { useState, useTransition, use, Suspense } from "react";
import TypeLogo from "@/components/ui/TypeLogo";
import LoginTrigger from "./LoginTrigger";

export default function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [promise, setPromise] = useState<Promise<any> | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleLogin = () => {
        startTransition(() => {
            const loginPromise = import("@/lib/api/fetchJson").then(({ fetchJson }) =>
                fetchJson("/api/login", {
                    method: "POST",
                    body: { loginId, password },
                })
            );
            setPromise(loginPromise);
        });
    };

    return (
        <div className="flex w-full h-[calc(100vh-60px)] items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-128 space-y-18">
                <TypeLogo className="w-full pointer-events-none" />

                <div className="w-full space-y-10">
                    <div className="w-full space-y-6">
                        <div className="relative">
                            <label htmlFor="loginId" className="hidden">
                                아이디
                            </label>
                            <input
                                id="loginId"
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="w-full px-7 py-3 body3_r text-white placeholder:text-gray-4 outline outline-gray-5 focus:outline-orange-main rounded-[10px] transition-colors duration-200"
                                placeholder="아이디를 입력해주세요"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="hidden">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-7 py-3 body3_r text-white placeholder:text-gray-4 outline outline-gray-5 focus:outline-orange-main rounded-[10px] transition-colors duration-200"
                                placeholder="비밀번호를 입력해주세요"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isPending}
                        className="w-full py-3 bg-orange-main sub1_sb text-white rounded-[10px] hover:bg-orange-main/90 cursor-pointer transition-colors duration-200 disabled:opacity-50"
                    >
                        {isPending ? "로그인 중..." : "로그인"}
                    </button>

                    {promise && (
                        <Suspense
                            fallback={<p className="body5_r text-gray-3">로그인 처리 중...</p>}
                        >
                            <LoginTrigger promise={promise} />
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
}
