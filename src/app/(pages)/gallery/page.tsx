import GalleryBanner from "./sections/GalleryBanner";
import NewsList from "./sections/NewsList";
import Activities from "./sections/Activities";
import { get_activity } from "@/lib/api/endpoints/activity";

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

            <div className="w-full flex flex-col items-start justify-start py-30 px-6 lg:px-4 xl:px-0 gap-30">
                <NewsList items={activities} />
                <Activities items={activities} />
            </div>
        </>
    );
}
