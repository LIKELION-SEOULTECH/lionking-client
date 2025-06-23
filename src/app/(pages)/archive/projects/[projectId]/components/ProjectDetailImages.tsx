import Image from "next/image";

type ProjectDetailImagesProps = {
    images: string[];
};

export default function ProjectDetailImages({ images }: ProjectDetailImagesProps) {
    return (
        <div className="w-full flex flex-col items-start justify-start gap-10">
            <h2 className="head3_sb text-white">서비스 소개</h2>
            <div className="w-full flex flex-col items-center justify-center">
                {images.map((image, index) => (
                    <div key={index} className="relative w-full aspect-video overflow-hidden">
                        <Image src={image} alt={`Image ${index + 1}`} fill />
                    </div>
                ))}
            </div>
        </div>
    );
}
