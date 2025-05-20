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
            <div className="flex flex-col gap-7 items-center justify-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <h2 className="sub1_sb text-orange-main">{displayName}</h2>

                    {Array.isArray(displayTitle) ? (
                        <h1 className="head2_b text-white text-center">
                            {displayTitle.map((title, index) => (
                                <span key={index} className="block">
                                    {title}
                                </span>
                            ))}
                        </h1>
                    ) : (
                        <h1 className="head2_b text-white">{displayTitle}</h1>
                    )}
                </div>

                {displayDescription && Array.isArray(displayDescription) ? (
                    <p className="body2_sb text-gray-2 text-center">
                        {displayDescription.map((description, index) => (
                            <span key={index} className="block">
                                {description}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className="body2_sb text-gray-2">{displayDescription}</p>
                )}
            </div>
            {children}
        </section>
    );
}
