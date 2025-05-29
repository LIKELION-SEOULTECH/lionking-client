export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white text-black overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="head3_sb text-black w-full">마이페이지</h1>
                    {children}
                </div>
            </div>
        </div>
    );
}
