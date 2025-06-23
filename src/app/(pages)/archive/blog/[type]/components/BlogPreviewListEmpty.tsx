import ImageWriteSVG from "@/assets/icons/img_write.svg";

export default function BlogPreviewListEmpty() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <ImageWriteSVG />
            <p className="body5_r text-gray-4">아직 작성한 글이 없어요!</p>
        </div>
    );
}
