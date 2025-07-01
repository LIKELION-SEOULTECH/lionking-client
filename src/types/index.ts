// export type Parts = "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";
export type Parts = "PLAN" | "DESIGN" | "FRONTEND" | "BACKEND" | "AI";
export type PartLabels = "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

export type PartFilters = "전체" | "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

// export type Role = "운영진" | "아기사자" | "휴면사자";
export type Role = "GUEST" | "MEMBER" | "MANAGER" | "REPRESENTATIVE" | "PREVIOUS";

export type RoleLabels = "게스트" | "아기사자" | "운영진" | "대표" | "휴면사자";

export type RoleFilters = "전체" | "운영진" | "아기사자";

export type BlogTypeFilters = "all" | "session" | "article";

export type PostTypes = "session" | "article";

export type PostPreviewMetadata = {
    postId: string | number;
    postType: PostTypes;
    part: Parts | string;
    title: string;
    description: string;
    date: string;
    authorName: string;
    authorId: string | number;
    imageUrl?: string;
    postHref?: string;
};

export type Member = {
    id: number;
    name: string;
    major?: string;
    position?: Parts;
    positionLabel?: PartLabels;
    generation?: number;
    role: Role;
    roleLabel: RoleLabels;
    imageUrl?: string;
    userTags?: string[]; // <파트> <운영진/아기사자> <부서>, 주황색으로 나오는 부분
    profileIntro?: string;
    profileIntroTags?: string[]; // 맴버프로필-소개 섹션에 들어가는 태그
    profileIntroSkills?: string;
    profileExternalLinks?: {
        type: string;
        url: string;
    }[];
};

export type User = {
    memberId: number;
    username: string;
    profileImage: string | null;
    department: string | null;
    position: string;
    role: string;
    descriptionTag: string | null;
    description: string | null;
    techStack: string | null;
    portfolioUrls: string | null;
};

export const roleEnumToLabel: Record<Role, RoleLabels> = {
    GUEST: "게스트",
    MEMBER: "아기사자",
    MANAGER: "운영진",
    REPRESENTATIVE: "대표",
    PREVIOUS: "휴면사자",
};

export const positionEnumToLabel: Record<Parts, PartLabels> = {
    PLAN: "기획",
    DESIGN: "디자인",
    FRONTEND: "프론트엔드",
    BACKEND: "백엔드",
    AI: "AI",
};

export type BlogContent = {
    blogId: number | string;
    title: string;
    author: {
        id: number | string;
        name: string;
        position: Parts | string;
    };
    thumbnail: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    blogType: BlogTypeFilters;
    goal: string[];
    summary: string[];
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
    | "중앙 해커톤"
    | "연합 해커톤"
    | "장기 프로젝트"
    | "기타";

export type ProjectTypeEnum =
    | ""
    | "IDEATHON"
    | "CENTRAL_HACKATHON"
    | "UNION_HACKATHON"
    | "LONG_TERM"
    | "ETC";

export const projectTypeLabelToEnum: Record<ProjectTypeFilters, ProjectTypeEnum | ""> = {
    활동: "",
    아이디어톤: "IDEATHON",
    "중앙 해커톤": "CENTRAL_HACKATHON",
    "연합 해커톤": "UNION_HACKATHON",
    "장기 프로젝트": "LONG_TERM",
    기타: "ETC",
};

export const projectTypeEnumToLabel: Record<ProjectTypeEnum, ProjectTypeFilters> = {
    "": "활동",
    IDEATHON: "아이디어톤",
    CENTRAL_HACKATHON: "중앙 해커톤",
    UNION_HACKATHON: "연합 해커톤",
    LONG_TERM: "장기 프로젝트",
    ETC: "기타",
};

export type ProjectCardVariants = "PROJECT_PAGE" | "MEMBER_PAGE";

export type ProjectPreviewBadgeType = "NONE" | "BEST" | "TEXT";

export type ProjectPreviewMetadata = {
    projectId: string | number;
    title: string;
    description: string;
    projectYear: string;
    imageUrl?: string;
    badges?: {
        type: ProjectPreviewBadgeType;
        text?: string;
        dark?: boolean;
    }[];
};

// export type Project = {
//     id: number;
//     title: string;
//     description: string;
//     videoLink?: string;
//     generation: number;
//     projectType: ProjectTypeEnum;
//     thumbnail: string;
//     participations: string[] | number[];
//     landingImages: string[];
//     retrospections: {
//         memberName: string;
//         content: string;
//     }[];
// };

export type ProjectParticipant = {
    memberId: number;
    username: string;
    profileImage: string | null;
    position: Parts | null;
    positionLabel: PartLabels | null;
    role: Role | null;
    retrospection: string;
};

export function mapMemberToProjectParticipant(member: Member): ProjectParticipant {
    return {
        memberId: member.id,
        username: member.name,
        profileImage: member.imageUrl || null,
        position: member.position || null,
        positionLabel: positionEnumToLabel[member.position as Parts] || null,
        role: member.role || null,
        retrospection: "",
    };
}

export type Project = {
    id: number;
    title: string;
    description: string;
    videoLink?: string;
    generation: number;
    projectType: ProjectTypeEnum;
    thumbnail: string;
    participations: ProjectParticipant[];
    landingImages: string[];
};

export type MemberPublishedPostFilters = "참여 프로젝트" | "작성한 글";
