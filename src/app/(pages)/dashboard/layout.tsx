export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white text-black overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    {children}
                </div>
            </div>
        </div>
    );
}
