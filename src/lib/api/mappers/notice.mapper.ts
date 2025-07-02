// ① 백엔드 DTO
export interface NoticeDto {
    id: number;
    authorId: number;
    noticeType: "GENERAL" | "IMPORTANT";
    title: string;
    content: string;
    contentMedia: { s3Key: string; mediaType: string }[];
    createdAt: string; // "2025-07-01"
}

// ② 프론트에서 쓸 타입
export interface Notice {
    id: number;
    title: string;
    createdAt: string; // "2025.07.01"
    isImportant: boolean;
    hasAttachment: boolean;
}

// ③ 매핑 함수
export function mapNotice(dto: NoticeDto): Notice {
    return {
        id: dto.id,
        title: dto.title,
        createdAt: dto.createdAt.replace(/-/g, "."), // 2025-07-01 → 2025.07.01
        isImportant: dto.noticeType === "IMPORTANT",
        hasAttachment: dto.contentMedia?.length > 0,
    };
}

// ─────────────────── 상세 전용 타입
export interface NoticeDetail extends Notice {
    content: string[]; // 문단 배열
    contentMedia: { s3Key: string; mediaType: string }[];
}

/** 상세 변환 함수 */
export function mapNoticeDetail(dto: NoticeDto): NoticeDetail {
    return {
        ...mapNotice(dto), // id · title · createdAt · isImportant · hasAttachment
        content: dto.content ? dto.content.split(/\n{2,}/).map((line) => line.trim()) : [], // 두 줄 이상 줄바꿈 기준으로 문단 분리
        contentMedia: dto.contentMedia || [],
    };
}
