"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { BlogFormValues, getBlogFormConfig } from "@/components/forms/configs/blogFormConfig";
import { get_blog_blogId } from "@/lib/api/endpoints/blog";
import { blogContentToFormValues } from "@/lib/api/mappers/blog.mapper";
import { LoaderCircle } from "lucide-react";
import { useParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBlogPage() {
    const params = useParams<{ blogId: string }>();
    const blogId = params.blogId;
    const [initialValues, setInitialValues] = useState<BlogFormValues | null>(null);
    const [blogNotFound, setBlogNotFound] = useState(false);

    const blogFormConfig = getBlogFormConfig({
        isEdit: true,
        blogId,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!blogId) return;

            const blog = await get_blog_blogId(blogId);
            if (!blog) {
                setBlogNotFound(true);
                return;
            }

            const data = await blogContentToFormValues(blog);
            setInitialValues({
                ...blogFormConfig.form.initialValues,
                ...data,
            });
        };

        fetchData();
    }, [blogId]);

    if (blogNotFound) return redirect("/archive/blog");

    if (!initialValues)
        return (
            <div className="flex items-center justify-center w-full text-center py-50">
                <LoaderCircle className="animate-spin" />
            </div>
        );

    return <GenericFormPage config={blogFormConfig} initialOverride={initialValues} />;
}
