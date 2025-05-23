import Image from "next/image";
import { News } from "@/types";

interface NewsCardProps {
    item: News;
}

export default function NewsCards({ item }: NewsCardProps) {
    return (
        <div className="rounded-xl overflow-hidden bg-[#1c1c1c] text-white">
            <Image
                src={item.thumbnailUrl}
                alt={item.title}
                width={330}
                height={186}
                className="w-full h-auto object-cover"
            />
            <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">{item.date}</p>
                <h3 className="text-lg font-bold truncate">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">{item.description}</p>
            </div>
        </div>
    );
}
