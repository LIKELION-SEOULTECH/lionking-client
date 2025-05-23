export type Parts = "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type Role = "운영진" | "아기사자" | "휴면사자";

export type RoleFilters = "전체" | "운영진" | "아기사자";

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
