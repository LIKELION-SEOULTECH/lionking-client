"use client";

import { StaggerChild, StaggerParent } from "@/components/animations/AppearStagger";
import { cn } from "@/lib/utils";

type SectionProps = {
    displayName?: string;
    displayTitle?: string | string[];
    displayDescription?: string | string[];
    theme?: "DARK" | "LIGHT";
    children: React.ReactNode;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
};

export default function Section({
    displayName,
    displayTitle,
    displayDescription,
    theme = "DARK",
    children,
    className = "",
    ref,
}: SectionProps) {
    return (
        <section
            className={cn(
                className,
                theme == "DARK" ? "" : "bg-white",
                "w-full flex flex-col items-center justify-center gap-18"
            )}
            ref={ref}
        >
            <StaggerParent delay={0.1} stagger={0.2} once={true}>
                <div className="flex flex-col items-center justify-center gap-7">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <StaggerChild>
                            <h2 className="sub1_sb text-orange-main break-keep">{displayName}</h2>
                        </StaggerChild>
                        {/* eslint-disable indent */}
                        <StaggerChild>
                            {Array.isArray(displayTitle) ? (
                                <h1
                                    className={cn(
                                        "text-center head3_sb",
                                        theme === "DARK" ? "text-white" : "text-black"
                                    )}
                                >
                                    {displayTitle.map((title, index) => (
                                        <span key={index} className="block break">
                                            {title}
                                        </span>
                                    ))}
                                </h1>
                            ) : (
                                <h1
                                    className={cn(
                                        "text-center head3_sb break-keep",
                                        theme === "DARK" ? "text-white" : "text-black"
                                    )}
                                >
                                    {displayTitle}
                                </h1>
                            )}
                        </StaggerChild>
                        {displayDescription && (
                            <StaggerChild>
                                <p
                                    className={cn(
                                        "text-center body3_r",
                                        theme === "DARK" ? "text-gray-2" : "text-gray-5"
                                    )}
                                >
                                    {Array.isArray(displayDescription)
                                        ? displayDescription.map((desc, idx) => (
                                              <span key={idx} className="block break-keep">
                                                  {desc}
                                              </span>
                                          ))
                                        : displayDescription}
                                </p>
                            </StaggerChild>
                        )}
                    </div>
                </div>
            </StaggerParent>
            {/* eslint-enable indent */}
            {children}
        </section>
    );
}
