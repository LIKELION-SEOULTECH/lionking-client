// src/__mocks__/noticeMock.ts

export interface NoticeMock {
    id: number;
    title: string;
    createdAt: string;
    isImportant: boolean; // 중요 게시글 여부
    hasAttachment: boolean; // 첨부파일 존재 여부
}

const noticeMock: NoticeMock[] = [
    {
        id: 1,
        title: "[멋사 홈페이지 발표 및 팀미팅 안내]",
        createdAt: "2025.06.21",
        isImportant: true,
        hasAttachment: false,
    },
    {
        id: 2,
        title: "해커톤 안내",
        createdAt: "2025.06.22",
        isImportant: false,
        hasAttachment: true,
    },
    {
        id: 3,
        title: "중간 발표 일정",
        createdAt: "2025.06.25",
        isImportant: false,
        hasAttachment: false,
    },
    {
        id: 4,
        title: "최종 발표 공지",
        createdAt: "2025.06.26",
        isImportant: false,
        hasAttachment: true,
    },
    {
        id: 5,
        title: "세미나 참가 안내",
        createdAt: "2025.06.27",
        isImportant: true,
        hasAttachment: false,
    },
    {
        id: 6,
        title: "디자인 가이드 배포",
        createdAt: "2025.06.28",
        isImportant: false,
        hasAttachment: true,
    },
    {
        id: 7,
        title: "팀별 회의 일정 조율",
        createdAt: "2025.06.29",
        isImportant: false,
        hasAttachment: false,
    },
    {
        id: 8,
        title: "과제 제출 안내",
        createdAt: "2025.06.30",
        isImportant: true,
        hasAttachment: true,
    },
    {
        id: 9,
        title: "워크숍 신청 링크",
        createdAt: "2025.07.01",
        isImportant: false,
        hasAttachment: true,
    },
    {
        id: 10,
        title: "운영진 연락처 공유",
        createdAt: "2025.07.02",
        isImportant: false,
        hasAttachment: false,
    },
    {
        id: 11,
        title: "이벤트 결과 발표",
        createdAt: "2025.07.03",
        isImportant: false,
        hasAttachment: true,
    },
];

export default noticeMock;
