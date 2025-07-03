import { cn } from "@/lib/utils";
import ImageWriteSVG from "@/assets/icons/img_write.svg";
import ProjectIcon from "@/assets/icons/img_folder.svg";
import SearchIcon from "@/assets/icons/search.svg";

type ViewType = "blogs" | "projects" | "posts" | "user" | "gallery" | "notice";

const defaultViewAssets: Record<ViewType, { icon: React.ReactNode; message: string }> = {
    blogs: {
        icon: <ImageWriteSVG />,
        message: "아직 작성한 블로그가 없어요!",
    },
    projects: {
        icon: <ProjectIcon />,
        message: "아직 프로젝트가 없어요!",
    },
    posts: {
        icon: <ImageWriteSVG />,
        message: "아직 게시글이 없어요!",
    },
    user: {
        icon: <SearchIcon />,
        message: "사용자를 찾을 수 없어요!",
    },
    gallery: {
        icon: <ImageWriteSVG />,
        message: "아직 활동 기록이 없어요!",
    },
    notice: {
        icon: <ImageWriteSVG />,
        message: "아직 공지사항이 없어요!",
    },
};

type EmptyViewsProps = {
    for: ViewType;
    customIcon?: React.ReactNode;
    customMessage?: string;
    theme?: "light" | "dark";
    className?: string;
};

export default function EmptyViews({
    for: viewType,
    customIcon,
    customMessage,
    theme = "light",
    className,
}: EmptyViewsProps) {
    const { icon, message } = defaultViewAssets[viewType];

    return (
        <div
            className={cn(
                "w-full h-full flex flex-col items-center justify-center gap-4",
                className
            )}
        >
            {customIcon || icon}
            <p className={cn("body5_r", theme === "dark" ? "text-white" : "text-gray-5")}>
                {customMessage || message}
            </p>
        </div>
    );
}
