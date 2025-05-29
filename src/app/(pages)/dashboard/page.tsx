import type { PostPreviewMetadata } from "@/types";
import DashboardMetricCardRow from "./components/DashboardMetricCardRow";
import DashboardProfileCard from "./components/DashboardProfileCard";
import DashboardPublishedBlogs from "./components/DashboardPublishedBlogs";

const mockMetrics = [
    {
        subheading: "내가 참여한 프로젝트",
        num: 3,
        suffix: "개",
    },
    {
        subheading: "내가 작성한 글",
        num: 11,
        suffix: "개",
    },
    {
        subheading: "나의 기수",
        num: 13,
        suffix: "기",
    },
];

const mockPublishedBlogs: PostPreviewMetadata[] = [
    {
        part: "프론트엔드",
        title: "리액트로 블로그 만들기",
        description: "리액트로 블로그를 만드는 방법에 대해 알아봅시다.",
        date: "2023-10-01",
        authorId: 1,
        authorName: "김먀옹",
    },
    {
        part: "백엔드",
        title: "Node.js로 서버 구축하기",
        description: "Node.js를 사용하여 간단한 서버를 구축하는 방법을 알아봅시다.",
        date: "2023-10-02",
        authorId: 1,
        authorName: "김먀옹",
    },
];

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
            <div className="h-fit lg:sticky">
                <DashboardProfileCard
                    member={{
                        id: 1,
                        name: "김먀옹",
                        major: "인공지능학과",
                        position: "프론트엔드",
                        role: "아기사자",
                        userTags: ["프론트엔드", "아기사자"],
                    }}
                />
                버튼..
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-10 mt-8 md:mt-0">
                <DashboardMetricCardRow metrics={mockMetrics} />

                <DashboardPublishedBlogs publishedBlogs={mockPublishedBlogs} />
            </div>
        </div>
    );
}
