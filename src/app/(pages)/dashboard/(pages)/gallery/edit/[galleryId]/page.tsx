"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import {
    GalleryFormValues,
    generateGalleryFormConfig,
} from "@/components/forms/configs/galleryFormConfig";
import { get_activity_activityId } from "@/lib/api/endpoints/activity";
import { activityToGalleryFormValues } from "@/lib/api/mappers/activity.mapper";
import { LoaderCircle } from "lucide-react";
import { useParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditGalleryPage() {
    const params = useParams<{ galleryId: string }>();
    const galleryId = params.galleryId;
    const [initialValues, setInitialValues] = useState<GalleryFormValues | null>(null);
    const [activityNotFound, setActivityNotFound] = useState(false);

    const galleryFormConfig = generateGalleryFormConfig({
        isEdit: true,
        galleryId: galleryId,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!galleryId) return;

            const activity = await get_activity_activityId(galleryId);
            if (!activity) {
                setActivityNotFound(true);
                return;
            }

            const data = await activityToGalleryFormValues(activity);
            setInitialValues({
                ...galleryFormConfig.form.initialValues,
                ...data,
            });
        };

        fetchData();
    }, [galleryId]);

    if (activityNotFound) return redirect("/gallery");

    if (!initialValues)
        return (
            <div className="flex items-center justify-center w-full text-center py-50">
                <LoaderCircle className="animate-spin" />
            </div>
        );

    return <GenericFormPage config={galleryFormConfig} initialOverride={initialValues} />;
}
