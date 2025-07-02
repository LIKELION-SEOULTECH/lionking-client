"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { generateGalleryFormConfig } from "@/components/forms/configs/galleryFormConfig";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewGalleryPage() {
    const { isAuthenticated, user, loading, error } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <LoaderCircle className="text-white size-4 animate-spin" />
            </div>
        );
    }
    if (error) {
        redirect("/login");
    }
    if (!isAuthenticated || !user) {
        redirect("/login");
    }

    const galleryFormConfig = generateGalleryFormConfig({
        isEdit: false,
        authorId: user.id,
    });

    return <GenericFormPage config={galleryFormConfig} />;
}
