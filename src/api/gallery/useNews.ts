import { useQuery } from "@tanstack/react-query";
import { News } from "@/types";

export const useNews = () => {
    return useQuery<News[]>({
        queryKey: ["gallery-news"],
        queryFn: async () => {
            const res = await fetch("/api/gallery/news");
            if (!res.ok) throw new Error("Failed to fetch news");
            return res.json();
        },
    });
};
