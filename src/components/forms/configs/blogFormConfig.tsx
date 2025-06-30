import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/archive/blog/icons.svg";
import { PostBlogRequest } from "@/lib/api/endpoints/blog";
import { extractS3KeysFromHtml, extractFilePathFromS3Url } from "@/lib/utils";

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
        blogType: form.category as "SESSION" | "ARTICLE",
        content: form.content,
        thumbnailImage: extractFilePathFromS3Url(form.thumbnail),
        contentMedia: extractS3KeysFromHtml(form.content),
    };
}

export const blogFormConfig: GenericFormPageConfig<BlogFormValues> = {
    banner: {
        title: "블로그 글 작성하기",
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

            console.log("Submitting blog post:", reqBody);

            const response = await fetch(`/api/blog/${values.authorId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "블로그 등록에 실패했습니다.");
            }

            return response.json();
        },
        submitButtonText: "작성하기",
        successConfig: {
            title: "블로그 글 작성이 완료되었습니다.",
            buttonLabel: "블로그 보러가기",
            href: "/archive/blog",
        },
    },
    isBlog: true,
};
