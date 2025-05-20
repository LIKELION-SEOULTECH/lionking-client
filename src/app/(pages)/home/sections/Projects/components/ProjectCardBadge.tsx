import CrownVector from "@/assets/crown.svg";

export type BadgeType = "NONE" | "BEST";

type ProjectCardBadgeProps = {
    type: BadgeType;
};

export default function ProjectCardBadge({ type }: ProjectCardBadgeProps) {
    if (type === "NONE") return;

    return (
        <div className="absolute z-10 top-3 left-3">
            <div className="flex items-center justify-center gap-1 px-2 py-1 bg-gray-2 rounded-[8px]">
                {type === "BEST" && (
                    <>
                        <CrownVector />
                        <p className="body6_r text-gray-5">우수 프로젝트</p>
                    </>
                )}
            </div>
        </div>
    );
}
