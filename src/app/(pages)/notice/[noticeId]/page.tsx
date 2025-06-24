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
        content: [
            "지금 무엇으로 이 글을 읽고 계신가요? PC? 스마트폰? 형태는 조금씩 다르지만, 컴퓨터로 보고 계실 것 같습니다. 여기에서부터 시작해 보죠.",
            "컴퓨터는 복잡해 보이지만, 결국엔 여러 부품들을 모아둔 기계들의 집합체입니다. 이 기계들을 제어하기 위해 필요한 것이 운영체제입니다. 컴퓨터와 소통하게 만들어주는 기반이죠. 윈도우, 갤럭시의 안드로이드가, 아이폰의 iOS같은 것들이 모두 운영체제입니다. 그리고 이 운영체제에 명령을 내리는 행위가 바로 코딩입니다.",
            "프로그래밍이라는 말도 많이 들어보셨을 텐데요, 코딩과 동의어로 봐도 큰 무리는 없습니다. 엑셀, 파워포인트 같은 프로그램은 결국엔 동일하게 작동하도록 미리 짜둔 코드의 집합이기 때문입니다. 코딩이란 결국 프로그램을 짜는 일이므로, ‘코딩=프로그래밍’으로 이해해도 큰 무리는 없는 것이죠. 뭐 하냐고 물었을 때 ‘요리한다’고 답하는 것과, ‘밥한다’고 답하는 것이 크게 차이 나지 않는 것처럼요",
        ],
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
            <DetailBody content={notice.content} attachment={notice.attachment} />

            {/* 접이식 하단 목록 */}
            <AccordionList currentId={notice.id} />
        </>
    );
}
