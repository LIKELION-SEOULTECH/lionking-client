interface NormalBannerProps {
    notice: {
        title: string;
        createdAt: string;
    };
}

export default function NormalBanner({ notice }: NormalBannerProps) {
    return (
        <div className="relative pt-[62px] w-screen h-[352px] bg-gray-1 overflow-hidden flex justify-center items-center">
            <div className="absolute left-[14%] top-[40%] flex flex-col gap-16">
                <p className="text-[32px] head3_sb font-bold text-gray-800">{notice.title}</p>
                <p className="text-[20px] text-gray-400">{notice.createdAt}</p>
            </div>
        </div>
    );
}
