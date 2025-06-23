// src/app/(pages)/notice/[noticeId]/page.tsx
import { notFound } from "next/navigation";
import React from "react";

// 상대경로로 상세 전용 분기 배너
import NoticeBanner from "./components/NoticeBanner"; // 내부에서 ImportantBanner / NormalBanner 분기
import DetailBody from "./components/DetailBody";
import AccordionList from "./components/AccordionList";

export default async function NoticeDetailPage({
    params,
}: {
    params: Promise<{ noticeId: string }>;
}) {
    const { noticeId } = await params;
    const id = Number(noticeId);

    // TODO: 실제 API 호출로 교체
    // const notice = await fetch(...).then(r => r.json());

    // 더미 데이터
    const notice = {
        id,
        title: "[멋사 홈페이지 발표 및 팀미팅 안내]",
        createdAt: "2025.04.18",
        isImportant: true,
        hasAttachment: true,
        content: ["본문 문단 1", "본문 문단 2", "본문 문단 3"],
        attachment: {
            name: "첨부) 어쩌구.pdf",
            size: "52MB",
            url: "/static/downloads/sample.pdf",
        },
    };

    if (!notice) return notFound();

    return (
        <>
            {/* 상세 전용: 중요/일반 분기형 배너 */}
            <NoticeBanner notice={notice} />

            {/* 본문 + 첨부파일 */}
            <DetailBody notice={notice} />

            {/* 접이식 하단 목록 */}
            <AccordionList currentId={notice.id} />
        </>
    );
}
