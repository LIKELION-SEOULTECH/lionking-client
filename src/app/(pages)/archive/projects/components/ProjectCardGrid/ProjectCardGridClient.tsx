"use client";

import { useRouter } from "next/navigation";
import {
    ProjectTypeEnum,
    ProjectTypeFilters,
    projectTypeEnumToLabel,
    projectTypeLabelToEnum,
} from "@/types";
import ProjectTypeSelector from "../Selectors/ProjectTypeSelector";
import ProjectYearSelector from "../Selectors/ProjectYearSelector";

type Props = {
    projectType: ProjectTypeEnum;
    generation: number;
};

export default function ProjectCardGridClient({ projectType, generation }: Props) {
    const router = useRouter();

    const handleTypeChange = (selectedLabel: ProjectTypeFilters) => {
        const backendEnum = projectTypeLabelToEnum[selectedLabel];
        router.push(`?projectType=${backendEnum}&generation=${generation}`);
    };

    const handleYearChange = (selectedYear: string) => {
        router.push(`?projectType=${projectType}&generation=${selectedYear}`);
    };

    const projectTypeDisplayLabel = projectTypeEnumToLabel[projectType];

    return (
        <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <ProjectTypeSelector value={projectTypeDisplayLabel} onChange={handleTypeChange} />
            <ProjectYearSelector value={`${generation}`} onChange={handleYearChange} />
        </div>
    );
}
