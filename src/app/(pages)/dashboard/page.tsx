import { getMe } from "@/lib/api/auth";
import DashboardMetricCardRow from "./components/DashboardMetricCardRow";
import DashboardProfileCard from "./components/DashboardProfileCard";
import DashboardPublishedBlogs from "./components/DashboardPublishedBlogs";
import DashboardActionButton from "./components/DashboardActionButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { get_blog_author_authorId } from "@/lib/api/endpoints/blog";
import { get_number_of_projects } from "@/lib/api/endpoints/project";

export const revalidate = 60;

export default async function DashboardPage() {
    const me = await getMe();

    if (!me) return redirect("/login");

    const publishedBlogs = await (async () => {
        try {
            const result = await get_blog_author_authorId(me.id);
            return result ?? [];
        } catch {
            return [];
        }
    })();

    const projectNumbers = await (async () => {
        try {
            return await get_number_of_projects(me.id);
        } catch {
            return 0;
        }
    })();

    const metrics = [
        {
            subheading: "내가 참여한 프로젝트",
            num: projectNumbers ?? 0,
            suffix: "개",
        },
        {
            subheading: "내가 작성한 글",
            num: publishedBlogs ? publishedBlogs.length : 0,
            suffix: "개",
        },
        {
            subheading: "나의 기수",
            num: me.generation ?? 0,
            suffix: "기",
        },
    ];

    return (
        <div className="overflow-hidden text-black bg-white">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="w-full text-black head3_sb">마이페이지</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-10 w-full">
                        <div className="h-fit lg:sticky">
                            <div className="flex flex-col items-start justify-start w-full gap-7">
                                <DashboardProfileCard member={me} />

                                <div className="flex-col items-start justify-start hidden w-full gap-4 lg:flex">
                                    <div className="w-full flex flex-col items-start justify-start gap-2.5">
                                        <Link className="w-full" href="/dashboard/settings/profile">
                                            <DashboardActionButton label="프로필 수정하기" />
                                        </Link>
                                        {me && me.role === "REPRESENTATIVE" && (
                                            <Link
                                                className="w-full"
                                                href="/dashboard/members/role-edit"
                                            >
                                                <DashboardActionButton label="맴버 관리하기" />
                                            </Link>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-full">
                                        <button className="underline transition-colors duration-200 cursor-pointer sub3_sb text-gray-4 hover:text-gray-5">
                                            아이디/비밀번호 변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-start w-full gap-10">
                            <div className="w-full lg:hidden flex flex-col items-start justify-start gap-2.5">
                                <Link className="w-full" href="/dashboard/settings/profile">
                                    <DashboardActionButton label="프로필 수정하기" />
                                </Link>
                                {me && me.role === "REPRESENTATIVE" && (
                                    <Link className="w-full" href="/dashboard/members/role-edit">
                                        <DashboardActionButton label="맴버 관리하기" />
                                    </Link>
                                )}
                            </div>

                            <DashboardMetricCardRow metrics={metrics} />

                            <DashboardPublishedBlogs publishedBlogs={publishedBlogs} />

                            <div className="flex flex-col items-center justify-center w-full lg:hidden">
                                <button className="underline transition-colors duration-200 cursor-pointer sub3_sb text-gray-4 hover:text-gray-5">
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
