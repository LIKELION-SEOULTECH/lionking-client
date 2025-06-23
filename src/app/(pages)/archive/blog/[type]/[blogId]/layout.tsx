export default function BlogDetailPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white w-full">
            <div className="w-full max-w-[1100px] mx-auto py-15 px-6">
                <div className="w-full flex flex-col items-start justify-start py-30 gap-18 break-keep">
                    {children}
                </div>
            </div>
        </div>
    );
}
