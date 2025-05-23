export type Parts = "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type PartFilters = "전체" | "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type Role = "운영진" | "아기사자" | "휴면사자";

export type RoleFilters = "전체" | "운영진" | "아기사자";

export type BlogTypeFilters = "세션" | "아티클";

export type PostPreviewMetadata = {
    part: Parts | string;
    title: string;
    description: string;
    date: string;
    authorName: string;
    authorId: string;
    imageUrl?: string;
    postHref?: string;
};

export type Member = {
    id: number;
    name: string;
    major: string;
    position: Parts;
    role: Role;
    // imageUrl: string;
};

export type News = {
    id: string;
    title: string;
    description: string;
    date: string;
    thumbnailUrl: string;
};

export type ProjectTypeFilters =
    | "활동"
    | "아이디어톤"
    | "중앙 헤커톤"
    | "연합 해커톤"
    | "장기 프로젝트"
    | "기타";
