import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/archive/blog/icons.svg";
import { PostBlogRequest } from "@/lib/api/endpoints/blog";
import { extractFilePathFromS3Url } from "@/lib/utils";
import { toast } from "sonner";

const blogSchema = Yup.object({
    title: Yup.string().required("제목을 입력해주세요").max(100, "최대 100자까지 입력 가능합니다"),
    category: Yup.string().required("카테고리를 선택해주세요"),
    thumbnail: Yup.string().required("썸네일을 업로드해주세요"),
    content: Yup.string().required("내용을 입력해주세요"),
    authorId: Yup.number().required(),
});

export type BlogFormValues = Yup.InferType<typeof blogSchema>;

export function generatePostBlogRequest(form: BlogFormValues): PostBlogRequest {
    return {
        title: form.title,
        blogType: form.category.toUpperCase() as "SESSION" | "ARTICLE",
        content: form.content,
        thumbnailImage: extractFilePathFromS3Url(form.thumbnail),
        // contentMedia: extractS3KeysFromHtml(form.content),
    };
}

export function getBlogFormConfig({
    isEdit = false,
    blogId,
}: {
    isEdit?: boolean;
    blogId?: number | string;
}): GenericFormPageConfig<BlogFormValues> {
    return {
        banner: {
            title: isEdit ? "블로그 수정하기" : "블로그 글 작성하기",
            icon: <Icons />,
        },
        form: {
            sections: [
                {
                    title: "제목",
                    fields: [
                        {
                            name: "title",
                            type: "text",
                            label: "제목",
                            placeholder: "제목을 입력하세요",
                            required: true,
                            limit: 100,
                        },
                    ],
                },
                {
                    title: "블로그 유형",
                    fields: [
                        {
                            name: "category",
                            type: "radio",
                            label: "블로그유형",
                            required: true,
                            options: [
                                { label: "세션", value: "SESSION" },
                                { label: "아티클", value: "ARTICLE" },
                            ],
                        },
                    ],
                },
                {
                    title: "썸네일",
                    fields: [
                        {
                            name: "thumbnail",
                            type: "imageDropzone",
                            label: "썸네일",
                            required: true,
                            multiple: false,
                        },
                    ],
                },
                {
                    title: "내용",
                    fields: [
                        {
                            name: "content",
                            type: "blogEditor",
                            label: "내용",
                            placeholder: "블로그 내용을 작성해주세요...",
                            required: true,
                        },
                    ],
                },
            ],

            initialValues: {
                title: "",
                category: "",
                thumbnail: "",
                content: "",
                authorId: 0,
            },
            validationSchema: blogSchema,
            onSubmit: async (values) => {
                const reqBody = generatePostBlogRequest(values);

                toast.info("블로그 요약 중이니까 끄지 말고 기다려.");

                const url = isEdit
                    ? `/api/mixed/blog/${blogId}`
                    : `/api/mixed/blog/${values.authorId}`;

                const method = isEdit ? "PATCH" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                });

                if (!response.ok) {
                    toast.error(`블로그 ${isEdit ? "수정" : "등록"}에 실패했습니다.`);
                    throw new Error("Failed to submit blog post");
                }

                return response.json();
            },
            submitButtonText: isEdit ? "수정하기" : "작성하기",
            successConfig: {
                title: `블로그 글 ${isEdit ? "수정" : "작성"}이 완료되었습니다.`,
                buttonLabel: "블로그 보러가기",
                href: "/archive/blog",
            },
        },
    };
}
