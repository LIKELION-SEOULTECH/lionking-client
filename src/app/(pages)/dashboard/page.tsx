import type { PostPreviewMetadata } from "@/types";
import DashboardMetricCardRow from "./components/DashboardMetricCardRow";
import DashboardProfileCard from "./components/DashboardProfileCard";
import DashboardPublishedBlogs from "./components/DashboardPublishedBlogs";
import DashboardActionButton from "./components/DashboardActionButton";

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
        <div className="bg-white text-black overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="head3_sb text-black w-full">마이페이지</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
                        <div className="h-fit lg:sticky">
                            <div className="w-full flex flex-col items-start justify-start gap-7">
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

                                <div className="w-full hidden lg:flex flex-col items-start justify-start gap-4">
                                    <div className="w-full flex flex-col items-start justify-start gap-2.5">
                                        <DashboardActionButton label="새 글 작성하기" />
                                        {/* <DashboardActionButton label="회원 관리" /> */}
                                    </div>

                                    <div className="w-full flex flex-col items-center justify-center">
                                        <button className="sub3_sb text-gray-4 underline hover:text-gray-5 transition-colors duration-200 cursor-pointer">
                                            아이디/비밀번호 변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-start justify-start gap-10">
                            <div className="w-full lg:hidden flex flex-col items-start justify-start gap-2.5">
                                <DashboardActionButton label="새 글 작성하기" />
                                {/* <DashboardActionButton label="회원 관리" /> */}
                            </div>

                            <DashboardMetricCardRow metrics={mockMetrics} />

                            <DashboardPublishedBlogs publishedBlogs={mockPublishedBlogs} />

                            <div className="w-full lg:hidden flex flex-col items-center justify-center">
                                <button className="sub3_sb text-gray-4 underline hover:text-gray-5 transition-colors duration-200 cursor-pointer">
                                    아이디/비밀번호 변경
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
