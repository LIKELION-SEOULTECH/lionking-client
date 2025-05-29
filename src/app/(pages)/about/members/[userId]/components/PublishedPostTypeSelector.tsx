import { MemberPublishedPostFilters } from "@/types";

type PublishedPostTypeSelectorProps = {
    type: MemberPublishedPostFilters;
    onChange: (type: MemberPublishedPostFilters) => void;
};

export default function PublishedPostTypeSelector({
    type,
    onChange,
}: PublishedPostTypeSelectorProps) {
    return (
        <div className="w-full lg:w-fit flex items-center justify-center h-13">
            <SelectorItem
                type="참여 프로젝트"
                selected={type === "참여 프로젝트"}
                onClick={() => onChange("참여 프로젝트")}
            />

            <SelectorItem
                type="작성한 글"
                selected={type === "작성한 글"}
                onClick={() => onChange("작성한 글")}
            />
        </div>
    );
}

function SelectorItem({
    type,
    selected,
    onClick,
}: {
    type: MemberPublishedPostFilters;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <div
            className={`w-full lg:w-[170px] flex items-center justify-center cursor-pointer py-3 sub2_sb ${
                selected
                    ? "text-orange-main hover:text-orange-main/80 border-b-4 border-orange-main"
                    : "text-gray-4 hover:text-gray-4/80 border-b-2 border-gray-4"
            } transition-all duration-200`}
            onClick={onClick}
        >
            {type}
        </div>
    );
}
