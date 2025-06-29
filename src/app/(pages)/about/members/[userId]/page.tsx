import { notFound } from "next/navigation";
import ProfilePanel from "./components/ProfilePanel";
import PublishedPosts from "./components/PublishedPosts";
import { get_member, get_member_memberId } from "@/lib/api/endpoints/member";
import { memberMapper } from "@/lib/api/mappers/member.mapper";

export default async function MemberPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const data = await get_member_memberId(userId).then((res) => res.data);

    if (!data) return notFound();

    const member = memberMapper(data);

    return (
        <div className="flex items-center justify-center w-full py-[160px]">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
                    <div className="h-fit lg:sticky">
                        <ProfilePanel member={member} />
                    </div>

                    <PublishedPosts />
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const data = await get_member().then((res) => res.data);

    return (data ?? []).map((member: any) => ({
        userId: member.memberId.toString(),
    }));
}
