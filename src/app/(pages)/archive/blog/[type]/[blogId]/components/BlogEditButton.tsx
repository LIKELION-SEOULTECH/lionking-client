"use client";

import KebabMenuDropdown from "@/components/ui/KebabMenuDropdown";
import { useAuth } from "@/hooks/auth/useAuth";
import { delete_blog_blogId } from "@/lib/api/endpoints/blog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BlogEditButton({ blogId }: { blogId: string | number }) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) return null;

    return (
        <KebabMenuDropdown
            items={[
                {
                    label: "수정하기",
                    onClick: () => router.push(`/dashboard/blog/edit/${blogId}`),
                },
                {
                    label: "삭제하기",
                    onClick: async () => {
                        delete_blog_blogId(blogId);
                        toast.success("블로그가 삭제되었습니다.");
                        router.refresh();
                    },
                },
            ]}
        />
    );
}
