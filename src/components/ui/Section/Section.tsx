import { cn } from "@/lib/utils";

type SectionProps = {
    displayName: string;
    displayTitle: string | string[];
    displayDescription?: string | string[];
    children: React.ReactNode;
    className?: string;
};

export default function Section({
    displayName,
    displayTitle,
    displayDescription,
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            className={cn(
                className,
                "w-full min-h-screen flex flex-col items-center justify-center gap-18"
            )}
        >
            <div className="flex flex-col items-center justify-center gap-7">
                <div className="flex flex-col items-center justify-center gap-6">
                    <h2 className="sub1_sb text-orange-main">{displayName}</h2>

                    {Array.isArray(displayTitle) ? (
                        <h1 className="text-center text-white head3_sb">
                            {displayTitle.map((title, index) => (
                                <span key={index} className="block">
                                    {title}
                                </span>
                            ))}
                        </h1>
                    ) : (
                        <h1 className="text-white head3_sb">{displayTitle}</h1>
                    )}
                </div>

                {displayDescription && Array.isArray(displayDescription) ? (
                    <p className="text-center body3_r">
                        {displayDescription.map((description, index) => (
                            <span key={index} className="block">
                                {description}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className="body3_r text-gray-2">{displayDescription}</p>
                )}
            </div>
            {children}
        </section>
    );
}
