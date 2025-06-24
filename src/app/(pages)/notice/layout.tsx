// src/app/notice/layout.tsx
"use client";

import React from "react";

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full min-h-screen bg-white">{children}</div>;
}
