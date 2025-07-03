import { notFound } from "next/navigation";
import ProfilePanel from "./components/ProfilePanel";
import PublishedPosts from "./components/PublishedPosts";
import { get_member, get_member_memberId } from "@/lib/api/endpoints/member";
import { get_blog_author_authorId } from "@/lib/api/endpoints/blog";
import { get_projects_metadata_by_user_id } from "@/lib/api/endpoints/project";

export const revalidate = 60;

export default async function MemberPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const member = await get_member_memberId(userId);

    if (!member) return notFound();

    const blog = await (async () => {
        try {
            const result = await get_blog_author_authorId(userId);
            return result ?? [];
        } catch {
            return [];
        }
    })();

    const projects = await (async () => {
        try {
            const numericUserId = Number(userId);
            if (isNaN(numericUserId)) return [];
            return await get_projects_metadata_by_user_id(numericUserId);
        } catch {
            return [];
        }
    })();

    return (
        <div className="flex items-center justify-center w-full py-[160px]">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
                    <div className="h-fit lg:sticky">
                        <ProfilePanel member={member} />
                    </div>

                    <PublishedPosts published={{ projects, blog }} />
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const data = await get_member();

    return (data ?? []).map((member) => ({
        userId: member.id.toString(),
    }));
}
