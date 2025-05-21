import { cn } from "@/lib/utils";

type SectionProps = {
    displayName: string;
    displayTitle: string | string[];
    displayDescription?: string | string[];
    theme?: "DARK" | "LIGHT";
    children: React.ReactNode;
    className?: string;
};

export default function Section({
    displayName,
    displayTitle,
    displayDescription,
    theme = "DARK",
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            className={cn(className, "w-full flex flex-col items-center justify-center gap-18")}
        >
            <div className="flex flex-col items-center justify-center gap-7">
                <div className="flex flex-col items-center justify-center gap-5">
                    <h2 className="sub1_sb text-orange-main">{displayName}</h2>

                    {Array.isArray(displayTitle) ? (
                        <h1
                            className={cn(
                                "text-center head3_sb",
                                theme === "DARK" ? "text-white" : "text-black"
                            )}
                        >
                            {displayTitle.map((title, index) => (
                                <span key={index} className="block">
                                    {title}
                                </span>
                            ))}
                        </h1>
                    ) : (
                        <h1
                            className={cn(
                                "text-center head3_sb",
                                theme === "DARK" ? "text-white" : "text-black"
                            )}
                        >
                            {displayTitle}
                        </h1>
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
                    <p
                        className={cn(
                            "text-center body3_r",
                            theme === "DARK" ? "text-gray-2" : "text-gray-5"
                        )}
                    >
                        {displayDescription}
                    </p>
                )}
            </div>
            {children}
        </section>
    );
}
