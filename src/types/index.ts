export type Parts = "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type PartFilters = "파트" | "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type Role = "운영진" | "아기사자" | "휴면사자";

export type RoleFilters = "전체" | "운영진" | "아기사자";

export type BlogTypeFilters = "세션" | "아티클";

export type Member = {
    id: number;
    name: string;
    major: string;
    position: Parts;
    role: Role;
    // imageUrl: string;
};
