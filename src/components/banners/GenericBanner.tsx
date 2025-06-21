import { ReactNode } from "react";

type GenericBannerProps = {
    title: string;
    icon?: ReactNode;
};

export default function GenericBanner({ title, icon }: GenericBannerProps) {
    return (
        <div className="pt-[62px] w-screen h-[352px] overflow-hidden relative flex items-center justify-center bg-gray-1">
            <div className="relative flex items-center justify-start w-full max-w-[1100px] h-full px-6 lg:px-4 xl:px-0">
                {icon && <div className="absolute right-0 z-0 pointer-events-none">{icon}</div>}
                <p className="z-10 head3_sb text-gray-8">{title}</p>
            </div>
        </div>
    );
}
