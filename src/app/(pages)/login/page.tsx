"use client";

import { useState, useTransition, useEffect } from "react";
import TypeLogo from "@/components/ui/TypeLogo";
import { useAuth } from "@/hooks/auth/useAuth";

export default function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (loginSuccess || isAuthenticated) {
            window.location.href = "/dashboard";
        }
    }, [isAuthenticated, loginSuccess]);

    const handleLogin = () => {
        setErrorMessage(null);

        startTransition(() => {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginId, password }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const err = await res.json().catch(() => ({}));
                        throw new Error(err?.message || "로그인 실패");
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data?.success) {
                        setLoginSuccess(true);
                    } else {
                        throw new Error("응답이 올바르지 않습니다");
                    }
                })
                .catch((err: Error) => {
                    setErrorMessage(err.message || "로그인 중 오류가 발생했습니다");
                });
        });
    };

    return (
        <div className="flex w-full h-[calc(100vh-60px)] items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-128 space-y-18">
                <TypeLogo className="w-full pointer-events-none" />

                <div className="w-full space-y-10">
                    <div className="w-full space-y-6">
                        <div className="relative">
                            <input
                                id="loginId"
                                type="text"
                                value={loginId}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="w-full px-7 py-3 body3_r text-white placeholder:text-gray-4 outline outline-gray-5 focus:outline-orange-main rounded-[10px] transition-colors duration-200"
                                placeholder="아이디를 입력해주세요"
                            />
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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

                    {errorMessage && (
                        <p className="text-red-400 text-center body5_r">{errorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
