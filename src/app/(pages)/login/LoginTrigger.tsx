"use client";

import { use } from "react";

export default function LoginTrigger({ promise }: { promise: Promise<any> }) {
    const data = use(promise);

    if (data?.success) {
        window.location.href = "/dashboard";
        return null;
    }

    throw new Error(data?.error ?? "로그인 실패");
}
