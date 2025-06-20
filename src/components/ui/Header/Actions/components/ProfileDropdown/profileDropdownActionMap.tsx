import type { Member } from "@/types";
import type {
    ProfileDropdownActionButtonProps,
    ProfileDropdownProps,
} from "@/components/ui/Header/types";

import AddGallerySVG from "@/assets/icons/profile_dropdowns/add_gallery.svg";
import DashboardSVG from "@/assets/icons/profile_dropdowns/dashboard.svg";
import NewNoticeSVG from "@/assets/icons/profile_dropdowns/new_notice.svg";
import NewProjectSVG from "@/assets/icons/profile_dropdowns/new_project.svg";
import SignOutSVG from "@/assets/icons/profile_dropdowns/sign_out.svg";
import WriteBlogSVG from "@/assets/icons/profile_dropdowns/write_blog.svg";

type Role = Member["role"];

type ActionGroup = ProfileDropdownActionButtonProps[];

type GroupedActionBuilder = (onClicks: ProfileDropdownProps["onClicks"]) => ActionGroup[];

export const profileDropdownActionMap: Record<Role, GroupedActionBuilder> = {
    운영진: (onClicks) => [
        [
            {
                label: "프로젝트 등록",
                icon: <NewProjectSVG />,
                href: "/dashboard/projects/new",
            },
            {
                label: "블로그 작성",
                icon: <WriteBlogSVG />,
                href: "/dashboard/blog/new",
            },
        ],
        [
            {
                label: "공지사항 등록",
                icon: <NewNoticeSVG />,
                href: "/dashboard/notice/new",
            },
            {
                label: "활동기록 등록",
                icon: <AddGallerySVG />,
                href: "/dashboard/gallery/new",
            },
        ],
        [
            {
                label: "마이페이지",
                icon: <DashboardSVG />,
                href: "/dashboard",
            },
            {
                label: "로그아웃",
                icon: <SignOutSVG />,
                onClick: onClicks.signout,
            },
        ],
    ],
    아기사자: (onClicks) => [
        [
            {
                label: "프로젝트 등록",
                icon: <NewProjectSVG />,
                href: "/dashboard/project/new",
            },
            {
                label: "블로그 작성",
                icon: <WriteBlogSVG />,
                href: "/dashboard/new",
            },
        ],
        [
            {
                label: "마이페이지",
                icon: <DashboardSVG />,
                href: "/dashboard",
            },
            {
                label: "로그아웃",
                icon: <SignOutSVG />,
                onClick: onClicks.signout,
            },
        ],
    ],
    휴면사자: (onClicks) => [
        [
            {
                label: "마이페이지",
                icon: <DashboardSVG />,
                href: "/dashboard",
            },
            {
                label: "로그아웃",
                icon: <SignOutSVG />,
                onClick: onClicks.signout,
            },
        ],
    ],
};
