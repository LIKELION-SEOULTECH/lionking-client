import CrownVector from "@/assets/crown.svg";
import { ProjectCardVariants, ProjectPreviewBadgeType } from "@/types";

type ProjectCardBadgeProps = {
    type: ProjectPreviewBadgeType;
    text?: string;
    dark?: boolean;
    variant?: ProjectCardVariants;
};

export default function ProjectCardBadge({
    type,
    text,
    dark = false,
    variant,
}: ProjectCardBadgeProps) {
    if (type === "NONE") return;

    return (
        <div className="flex items-center justify-center">
            <div
                className={`flex items-center justify-center gap-1 ${
                    dark ? "bg-gray-5 text-gray-1" : "bg-gray-2 text-gray-5"
                } ${
                    variant === "MEMBER_PAGE"
                        ? "py-1 px-[5px] rounded-[7.23px]"
                        : "py-1 px-1.5 rounded-[8px]"
                }`}
            >
                {type === "BEST" && (
                    <>
                        <CrownVector />
                        <p className="caption8_m">우수 프로젝트</p>
                    </>
                )}
                {type === "TEXT" && text && (
                    <>
                        <p className="caption8_m">{text}</p>
                    </>
                )}
            </div>
        </div>
    );
}
