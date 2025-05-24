import { ProjectPreviewMetadata } from "@/types";

const projectMock: ProjectPreviewMetadata[] = [
    {
        title: "저메추",
        description: "배고프다",
        projectYear: "12기",
        imageUrl: "/static/images/placeholder.png",
        postHref: "/archive/projects/hungry",
        badges: [
            { type: "BEST", dark: true },
            { type: "TEXT", text: "아이디어톤", dark: true },
        ],
    },
    {
        title: "먀옹",
        description: "고양이는 어떻게 생겼을까",
        projectYear: "12기",
        imageUrl: "/static/images/placeholder.png",
        postHref: "/archive/projects/cat",
        badges: [
            { type: "BEST", dark: true },
            { type: "TEXT", text: "연합 해커톤", dark: true },
        ],
    },
];

export default projectMock;
