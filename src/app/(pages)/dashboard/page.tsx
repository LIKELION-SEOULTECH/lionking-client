import { getMe } from "@/lib/api/auth";
import DashboardMetricCardRow from "./components/DashboardMetricCardRow";
import DashboardProfileCard from "./components/DashboardProfileCard";
import DashboardPublishedBlogs from "./components/DashboardPublishedBlogs";
import DashboardActionButton from "./components/DashboardActionButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { get_blog_author_authorId } from "@/lib/api/endpoints/blog";

export default async function DashboardPage() {
    const me = await getMe();

    if (!me) return redirect("/login");

    const publishedBlogs = await get_blog_author_authorId(me.id);

    const metrics = [
        {
            subheading: "내가 참여한 프로젝트",
            num: 0,
            suffix: "개",
        },
        {
            subheading: "내가 작성한 글",
            num: publishedBlogs.length ?? 0,
            suffix: "개",
        },
        {
            subheading: "나의 기수",
            num: me.generation ?? 0,
            suffix: "기",
        },
    ];

    return (
        <div className="bg-white text-black overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="head3_sb text-black w-full">마이페이지</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
                        <div className="h-fit lg:sticky">
                            <div className="w-full flex flex-col items-start justify-start gap-7">
                                <DashboardProfileCard member={me} />

                                <div className="w-full hidden lg:flex flex-col items-start justify-start gap-4">
                                    <div className="w-full flex flex-col items-start justify-start gap-2.5">
                                        <DashboardActionButton label="새 글 작성하기" />
                                        <Link className="w-full" href="/dashboard/settings/profile">
                                            <DashboardActionButton label="프로필 수정하기" />
                                        </Link>
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

                                <Link className="w-full" href="/dashboard/settings/profile">
                                    <DashboardActionButton label="프로필 수정하기" />
                                </Link>
                            </div>

                            <DashboardMetricCardRow metrics={metrics} />

                            <DashboardPublishedBlogs publishedBlogs={publishedBlogs} />

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
