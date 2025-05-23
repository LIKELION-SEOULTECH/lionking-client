export default function ArchiveLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="bg-white">{children}</div>;
}
