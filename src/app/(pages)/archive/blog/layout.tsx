import ArchiveBanner from "./components/ArchiveBlogBanner";

export default function ArchiveLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white">
            <ArchiveBanner />
            {children}
        </div>
    );
}
