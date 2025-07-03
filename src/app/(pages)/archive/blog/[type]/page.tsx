import { notFound } from "next/navigation";
import BlogList from "./components/BlogList";
import ArchiveBlogBanner from "../components/ArchiveBlogBanner";

export const revalidate = 60;

export default async function ArchiveBlogArticlePage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;

    const selectedBlogType = type as "session" | "article";

    if (!selectedBlogType) {
        notFound();
    }

    return (
        <div className="bg-white w-full">
            <ArchiveBlogBanner />
            <BlogList selectedBlogType={selectedBlogType} />
        </div>
    );
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return [{ type: "article" }, { type: "session" }];
}
