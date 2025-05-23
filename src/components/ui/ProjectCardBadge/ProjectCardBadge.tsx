import CrownVector from "@/assets/crown.svg";

export type BadgeType = "NONE" | "BEST" | "TEXT";

type ProjectCardBadgeProps = {
    type: BadgeType;
    text?: string;
    dark?: boolean;
};

export default function ProjectCardBadge({ type, text, dark = false }: ProjectCardBadgeProps) {
    if (type === "NONE") return;

    return (
        <div className="flex items-center justify-center">
            <div
                className={`flex items-center justify-center gap-1 px-2 py-1 rounded-[8px] ${
                    dark ? "bg-gray-5 text-gray-1" : "bg-gray-2 text-gray-5"
                }`}
            >
                {type === "BEST" && (
                    <>
                        <CrownVector />
                        <p className="body6_r">우수 프로젝트</p>
                    </>
                )}
                {type === "TEXT" && text && (
                    <>
                        <p className="body6_r">{text}</p>
                    </>
                )}
            </div>
        </div>
    );
}
