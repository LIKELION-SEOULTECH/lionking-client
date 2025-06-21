"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { blogFormConfig } from "@/components/forms/configs/blogFormConfig";

export default function NewBlogPage() {
    return <GenericFormPage config={blogFormConfig} />;
}
