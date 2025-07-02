// src/app/(pages)/notice/[noticeId]/page.tsx

import { notFound } from "next/navigation";
import React from "react";

import NoticeBanner from "./components/NoticeBanner";
import DetailBody from "./components/DetailBody";
import AccordionList from "./components/AccordionList";

import { get_notice_noticeId } from "@/lib/api/endpoints/notice";
import { mapNoticeDetail } from "@/lib/api/mappers/notice.mapper";
import type { NoticeDetail } from "@/lib/api/mappers/notice.mapper";

export default async function NoticeDetailPage({
    params,
}: {
    params: Promise<{ noticeId: string }>;
}) {
    // await params로 Next가 넘겨준 프로미스 해제
    const { noticeId } = await params;

    // ① 내부 엔드포인트 호출
    const raw = await get_notice_noticeId(noticeId);
    const dto = raw?.data ?? raw;
    if (!dto) return notFound();

    // ② DTO → 프론트용 타입으로 매핑
    const notice = mapNoticeDetail(dto) as NoticeDetail;

    // ③ 첨부파일 정보 추출 (첫 번째 미디어만 예시로)
    const attachment =
        notice.contentMedia.length > 0
            ? {
                  name: notice.contentMedia[0].s3Key.split("/").pop() || "첨부파일",
                  size: "",
                  url: `https://YOUR_CDN/${notice.contentMedia[0].s3Key}`,
              }
            : undefined;

    return (
        <>
            {/* 중요/일반 분기형 배너 */}
            <NoticeBanner notice={notice} />

            {/* 본문 + 첨부파일 */}
            <DetailBody content={notice.content} attachment={attachment} resourceName="공지사항" />

            {/* 하단 접이식 목록 */}
            <AccordionList currentId={notice.id} />
        </>
    );
}
