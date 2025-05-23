import ArchiveBlogBanner from "./components/ArchiveBlogBanner";

export default function ArchiveLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white w-full">
            <ArchiveBlogBanner />
            {children}
        </div>
    );
}
