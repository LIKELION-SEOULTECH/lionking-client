"use client";

import KebabMenuDropdown from "@/components/ui/KebabMenuDropdown";
import { useAuth } from "@/hooks/auth/useAuth";
import { delete_activity_activityId } from "@/lib/api/endpoints/activity";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GalleryEditButton({ galleryId }: { galleryId: string | number }) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) return null;

    return (
        <KebabMenuDropdown
            items={[
                {
                    label: "수정하기",
                    onClick: () => router.push(`/dashboard/gallery/edit/${galleryId}`),
                },
                {
                    label: "삭제하기",
                    onClick: async () => {
                        delete_activity_activityId(galleryId);
                        toast.success("활동기록이 삭제되었습니다.");
                        router.refresh();
                    },
                },
            ]}
        />
    );
}
