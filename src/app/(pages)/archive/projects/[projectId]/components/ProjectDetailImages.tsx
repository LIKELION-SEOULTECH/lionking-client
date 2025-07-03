import Image from "next/image";

type ProjectDetailImagesProps = {
    images: string[];
};

export default function ProjectDetailImages({ images }: ProjectDetailImagesProps) {
    return (
        <div className="flex flex-col items-start justify-start w-full gap-10">
            <h2 className="text-white head3_sb">서비스 소개</h2>
            <div className="flex flex-col items-center justify-center w-full">
                {images.map((image, index) => (
                    <div key={index} className="relative w-full overflow-hidden aspect-video">
                        <Image src={image} alt={`Image ${index + 1}`} fill />
                    </div>
                ))}
            </div>
        </div>
    );
}
