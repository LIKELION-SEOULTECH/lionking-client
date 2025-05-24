import { ProjectTypeFilters } from "@/types";
import DropdownSelector from "@/components/ui/DropdownSelector";

const projectTypeOptions: ProjectTypeFilters[] = [
    "활동",
    "아이디어톤",
    "중앙 헤커톤",
    "연합 해커톤",
    "장기 프로젝트",
    "기타",
];

type ProjectTypeSelectorProps = {
    value: ProjectTypeFilters;
    onChange: (value: ProjectTypeFilters) => void;
};

export default function ProjectTypeSelector({ value, onChange }: ProjectTypeSelectorProps) {
    return <DropdownSelector value={value} onChange={onChange} options={projectTypeOptions} dark />;
}
