export default function ProjectDetailPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-[1100px] mx-auto py-15 px-6">
            <div className="w-full flex flex-col items-start justify-start py-30 gap-35">
                {children}
            </div>
        </div>
    );
}
