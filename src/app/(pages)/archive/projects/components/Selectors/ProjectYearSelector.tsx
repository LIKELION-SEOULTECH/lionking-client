"use client";

import DropdownSelector from "@/components/ui/DropdownSelector";
import { generationToLabel } from "@/lib/utils";

type ProjectYearSelectorProps = {
    value: number | string;
    onChange: (value: string) => void;
    generations?: number[];
};

export default function ProjectYearSelector({
    value,
    onChange,
    generations = [13, 12],
}: ProjectYearSelectorProps) {
    const options = ["기수", ...generations.map((g) => `${g}기`)];

    const selectedLabel = typeof value === "number" ? generationToLabel(value) : value;

    return <DropdownSelector value={selectedLabel} onChange={onChange} options={options} dark />;
}
