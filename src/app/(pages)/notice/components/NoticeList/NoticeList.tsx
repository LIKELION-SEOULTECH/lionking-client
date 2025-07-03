import AttachmentIcon from "@/assets/icons/attachment.svg";
import { get_notice } from "@/lib/api/endpoints/notice";
import EmptyViews from "@/components/ui/EmptyViews";
import Link from "next/link";

export const revalidate = 60;

export default async function NoticeList() {
    const notice = await get_notice();

    if (!notice || notice.length === 0) {
        return (
            <div className="w-full flex items-center justify-center h-[30vh]">
                <EmptyViews for="blogs" />
            </div>
        );
    }

    const important = notice.filter((n) => n.isImportant).sort((a, b) => b.id - a.id);
    const normal = notice.filter((n) => !n.isImportant).sort((a, b) => b.id - a.id);
    const ordered = [...important, ...normal];

    return (
        <div className="bg-white w-full min-h-screen md:aspect-[1440/1100]">
            <div className="w-full max-w-[1100px] mx-auto px-4">
                <div className="mt-[120px]" />

                <div className="grid grid-cols-[80px_1fr_140px] h-[63px] bg-gray-1 text-gray-8 body3_m rounded items-center border-t border-b border-static-black-20">
                    <div className="text-center">No.</div>
                    <div className="text-left pl-36">제목</div>
                    <div className="text-center">작성일</div>
                </div>

                {ordered.map((notice, idx) => (
                    <div
                        key={notice.id}
                        className="grid grid-cols-[80px_1fr_140px] items-center h-[84px] border-t border-black/20 border-b"
                    >
                        <div className="flex items-center justify-center">
                            {notice.isImportant ? (
                                <span className="flex items-center justify-center px-4 py-1.5 bg-orange-main body4_m text-white rounded-full">
                                    중요
                                </span>
                            ) : (
                                <span className="text-gray-6 body3_m">{ordered.length - idx}</span>
                            )}
                        </div>

                        <Link
                            href={`/notice/${notice.id}`}
                            className="flex items-center text-gray-8 pl-[27px] body3_m hover:underline"
                        >
                            {notice.title}
                            {notice.hasAttachment && (
                                <AttachmentIcon className="ml-[2px] scale-[0.8]" />
                            )}
                        </Link>

                        <div className="text-center text-gray-6 body3_r">{notice.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
