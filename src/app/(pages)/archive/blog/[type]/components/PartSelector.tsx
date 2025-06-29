import { PartFilters } from "@/types";
import DropdownSelector from "@/components/ui/DropdownSelector";

const partOptions: PartFilters[] = ["전체", "기획", "디자인", "프론트엔드", "백엔드", "AI"];

type PartSelectorProps = {
    value: PartFilters;
    onChange: (value: PartFilters) => void;
};

export default function PartSelector({ value, onChange }: PartSelectorProps) {
    return (
        <div className="w-full flex items-center justify-start lg:justify-end">
            <DropdownSelector value={value} onChange={onChange} options={partOptions} />
        </div>
    );
}
