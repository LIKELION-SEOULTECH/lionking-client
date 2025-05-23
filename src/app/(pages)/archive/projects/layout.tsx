import ArchiveProjectsBanner from "./components/ArchiveProjectsBanner";

export default function ArchiveLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full">
            <ArchiveProjectsBanner />
            {children}
        </div>
    );
}
