"use client";

import KebabMenuDropdown from "@/components/ui/KebabMenuDropdown";
import { useAuth } from "@/hooks/auth/useAuth";
import { delete_projects_projectId } from "@/lib/api/endpoints/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectEditButton({ projectId }: { projectId: string | number }) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) return null;

    return (
        <KebabMenuDropdown
            dark
            items={[
                {
                    label: "수정하기",
                    onClick: () => router.push(`/dashboard/projects/edit/${projectId}`),
                },
                {
                    label: "삭제하기",
                    onClick: async () => {
                        delete_projects_projectId(projectId);
                        toast.success("프로젝트가 삭제되었습니다.");
                        router.refresh();
                    },
                },
            ]}
        />
    );
}
