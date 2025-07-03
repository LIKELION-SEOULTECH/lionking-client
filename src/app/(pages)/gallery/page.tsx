import GalleryBanner from "./sections/GalleryBanner";
import NewsList from "./sections/NewsList";
import Activities from "./sections/Activities";
import { get_activity } from "@/lib/api/endpoints/activity";
import EmptyViews from "@/components/ui/EmptyViews";

export const revalidate = 60;

export default async function GalleryPage() {
    const activities = await (async () => {
        try {
            const result = await get_activity();
            return result ?? [];
        } catch {
            return [];
        }
    })();

    return (
        <>
            <GalleryBanner />

            {activities.length === 0 ? (
                <div className="w-full flex items-center justify-center py-20">
                    <EmptyViews for="gallery" theme="dark" />
                </div>
            ) : (
                <div className="w-full flex flex-col items-start justify-start py-30 px-6 lg:px-4 xl:px-0 gap-30">
                    <NewsList items={activities} />
                    <Activities items={activities} />
                </div>
            )}
        </>
    );
}
