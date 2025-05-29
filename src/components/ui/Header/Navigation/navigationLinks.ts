export type NavigationLink = {
    label: string;
    key: string;
    href: string;
    children?: {
        label: string;
        key: string;
        href: string;
    }[];
};

export const navigationLinks: NavigationLink[] = [
    {
        label: "소개",
        key: "about",
        href: "/about",
        children: [
            { label: "About Us", key: "about-us", href: "/about" },
            { label: "맴버", key: "about-members", href: "/about/members" },
        ],
    },
    {
        label: "아카이빙",
        href: "/archive/projects",
        key: "archive",
        children: [
            { label: "프로젝트", key: "archive-projects", href: "/archive/projects" },
            { label: "블로그", key: "archive-blog", href: "/archive/blog" },
        ],
    },
    {
        label: "활동기록",
        key: "gallery",
        href: "/gallery",
    },
    {
        label: "공지사항",
        key: "notice",
        href: "/notice",
    },
];
