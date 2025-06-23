"use client";

import React from "react";
import NoticeBanner from "./components/NoticeBanner";

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen bg-white">
            {" "}
            <NoticeBanner />
            <div className="px-6 py-8">{children}</div>
        </div>
    );
}
