import GalleryBanner from "./sections/GalleryBanner";
import NewsList from "./sections/NewsList";
import Activities from "./sections/Activities";

export default function GalleryPage() {
    return (
        <>
            <GalleryBanner />
            <NewsList />
            <Activities />
        </>
    );
}
