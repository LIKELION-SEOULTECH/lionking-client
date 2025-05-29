import DropdownSelector from "@/components/ui/DropdownSelector";

const projectYearOptions = ["기수", "12기", "13기"];

type ProjectYearSelectorProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function ProjectYearSelector({ value, onChange }: ProjectYearSelectorProps) {
    return <DropdownSelector value={value} onChange={onChange} options={projectYearOptions} dark />;
}
