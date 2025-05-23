"use client";

import { useState } from "react";
import ProjectCardStatic from "../ProjectCardStatic";
import ProjectTypeSelector from "../Selectors/ProjectTypeSelector";
import ProjectYearSelector from "../Selectors/ProjectYearSelector";
import { ProjectTypeFilters } from "@/types";

export default function ProjectCardGrid() {
    const [selectedProjectType, setSelectedProjectType] = useState<ProjectTypeFilters>("활동");
    const [selectedProjectYear, setSelectedProjectYear] = useState<string>("기수");

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1100px] flex flex-col items-center py-[140px] px-4 sm:px-6 lg:px-0 gap-15">
                <div className="w-full flex flex-wrap items-center justify-start gap-3">
                    <ProjectTypeSelector
                        value={selectedProjectType}
                        onChange={setSelectedProjectType}
                    />
                    <ProjectYearSelector
                        value={selectedProjectYear}
                        onChange={setSelectedProjectYear}
                    />
                </div>

                <div className="w-full grid place-items-center gap-x-[35px] gap-y-[52px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <ProjectCardStatic
                            key={index}
                            information={{
                                projectName: "Project Name",
                                projectDescription: "Project Description",
                                projectYear: "12기",
                            }}
                            badges={[{ type: "BEST" }, { type: "TEXT", text: "아이디어톤" }]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
