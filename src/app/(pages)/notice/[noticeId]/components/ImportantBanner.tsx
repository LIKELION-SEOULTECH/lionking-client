interface ImportantBannerProps {
    notice: {
        title: string;
        createdAt: string;
    };
}

export default function ImportantBanner({ notice }: ImportantBannerProps) {
    return (
        <div className="relative pt-[62px] w-full h-[352px] bg-gray-1 overflow-hidden flex justify-center items-center bg-gradient-to-r from-orange-50 to-orange-200">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-0">
                <div className="flex flex-col gap-16">
                    <div className="flex items-center gap-5">
                        <p className="text-[32px] font-bold text-gray-800">{notice.title}</p>
                        <span
                            className="inline-flex items-center justify-center
                        w-[67px] h-[40px]
                        bg-orange-main text-white
                        sub2_sb text-[20px]
                        rounded-full"
                        >
                            중요
                        </span>
                    </div>
                    <p className="text-[20px] text-gray-400">{notice.createdAt}</p>
                </div>
            </div>
        </div>
    );
}
