"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { galleryFormConfig } from "@/components/forms/configs/galleryFormConfig";

export default function NewGalleryPage() {
    return <GenericFormPage config={galleryFormConfig} />;
}
