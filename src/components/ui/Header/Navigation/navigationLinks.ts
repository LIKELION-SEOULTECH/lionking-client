export type NavigationLink = {
    label: string;
    key: string;
    href?: string;
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
        children: [
            { label: "About Us", key: "about-us", href: "/about" },
            { label: "맴버", key: "about-members", href: "/about/members" },
        ],
    },
    {
        label: "아카이빙",
        key: "archive",
        href: "/archive",
    },
    {
        label: "활동기록",
        key: "activities",
        href: "/activities",
    },
    {
        label: "공지사항",
        key: "notice",
        href: "/notice",
    },
];
