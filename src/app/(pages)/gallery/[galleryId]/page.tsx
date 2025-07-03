import { get_activity_activityId } from "@/lib/api/endpoints/activity";
import { redirect } from "next/navigation";
import GalleryInfo from "./components/GalleryInfo";

export default async function GalleryDetailPage({
    params,
}: {
    params: Promise<{ galleryId: string }>;
}) {
    const { galleryId } = await params;

    let content;

    try {
        content = await get_activity_activityId(galleryId);
    } catch (error) {
        console.error(error);
        return redirect("/gallery");
    }

    if (!content) {
        return redirect("/gallery");
    }

    return (
        <main className="w-full bg-white">
            <section className="max-w-screen-lg mx-auto px-6 pt-8 pb-50">
                <GalleryInfo gallery={content} />
            </section>

            {/* 지난 기록 더 보기 */}
            {/* <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#F6F6F6]">
                <section className="max-w-screen-lg mx-auto px-6 py-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">지난 기록 더 보기</h2>
                    <RecordList records={newsMock} />
                </section>
            </div> */}
        </main>
    );
}
