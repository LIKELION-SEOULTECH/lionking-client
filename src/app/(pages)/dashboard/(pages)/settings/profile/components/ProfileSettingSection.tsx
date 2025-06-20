export default function ProfileSettingSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid w-full grid-cols-[minmax(0,140px)_1fr] gap-15">
            <h2 className="head3_sb text-white">{title}</h2>
            <div className="w-full flex flex-col self-start justify-self-start items-start justify-start gap-8">
                {children}
            </div>
        </div>
    );
}
