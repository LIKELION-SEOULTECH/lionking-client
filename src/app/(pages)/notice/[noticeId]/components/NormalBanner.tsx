interface NormalBannerProps {
    notice: {
        title: string;
        createdAt: string;
    };
}

export default function NormalBanner({ notice }: NormalBannerProps) {
    return (
        <div className="relative pt-[62px] w-full h-[352px] bg-gray-1 overflow-hidden flex justify-center items-center">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-0">
                <div className="w-full h-full flex items-start justify-start">
                    <div className="flex flex-col gap-16">
                        <p className="text-[32px] head3_sb font-bold text-gray-800">
                            {notice.title}
                        </p>
                        <p className="text-[20px] text-gray-400">{notice.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
