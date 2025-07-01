"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { blogFormConfig } from "@/components/forms/configs/blogFormConfig";
import { useAuth } from "@/hooks/auth/useAuth";
import { redirect } from "next/navigation";

export default function NewBlogPage() {
    const { isAuthenticated, user, loading, error } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        redirect("/login");
    }
    if (!isAuthenticated) {
        redirect("/login");
    }
    return (
        <GenericFormPage
            config={blogFormConfig}
            initialOverride={{
                authorId: user?.id || 0,
            }}
        />
    );
}
