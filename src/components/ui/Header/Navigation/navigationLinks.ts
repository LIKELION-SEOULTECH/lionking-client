export type NavigationLink = {
    label: string;
    key: string;
    href: string;
};

export const navigationLinks: NavigationLink[] = [
    { label: "소개", key: "about", href: "/about" },
    { label: "아카이빙", key: "archive", href: "/archive" },
    { label: "활동기록", key: "activities", href: "/activities" },
    { label: "공지사항", key: "notice", href: "/notice" },
];
