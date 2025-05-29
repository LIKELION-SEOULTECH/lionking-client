import { notFound } from "next/navigation";
import ProfilePanel from "./components/ProfilePanel";
import PublishedPosts from "./components/PublishedPosts";
import membersMock from "@/__mocks__/membersMock";

export default async function MemberPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const member = membersMock.find((m) => m.id.toString() === userId);

    if (!member) return notFound();

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
    return membersMock.map((member) => ({
        userId: member.id.toString(),
    }));
}
