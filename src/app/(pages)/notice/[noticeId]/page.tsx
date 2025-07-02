// src/app/(pages)/notice/[noticeId]/page.tsx

import { notFound } from "next/navigation";
import React from "react";

import NoticeBanner from "./components/NoticeBanner";
import DetailBody from "./components/DetailBody";
import AccordionList from "./components/AccordionList";

import { get_notice_noticeId } from "@/lib/api/endpoints/notice";
import { mapNoticeDetail } from "@/lib/api/mappers/notice.mapper";
import type { NoticeDetail } from "@/lib/api/mappers/notice.mapper";

export default async function NoticeDetailPage({ params }: { params: { noticeId: string } }) {
    const { noticeId } = params;

    // ① 내부 엔드포인트 호출 (fetch() 대신)
    const raw = await get_notice_noticeId(noticeId);
    const dto = raw?.data ?? raw;
    if (!dto) return notFound();

    // ② DTO → 프론트 타입으로 매핑
    const notice = mapNoticeDetail(dto) as NoticeDetail;

    // ③ 첨부파일 정보 준비 (contentMedia 첫 항목 가정)
    const attachment = notice.contentMedia.length
        ? {
              name: notice.contentMedia[0].s3Key.split("/").pop() || "첨부파일",
              size: "",
              url: `https://YOUR_CDN/${notice.contentMedia[0].s3Key}`,
          }
        : undefined;

    return (
        <>
            {/* 중요/일반 분기 배너 */}
            <NoticeBanner notice={notice} />

            {/* 본문 + 첨부 */}
            <DetailBody content={notice.content} attachment={attachment} resourceName="공지사항" />

            {/* 하단 AccordionList */}
            <AccordionList currentId={notice.id} />
        </>
    );
}
