import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/archive/blog/icons.svg";

const blogSchema = Yup.object({
    title: Yup.string().required("제목을 입력해주세요").max(100, "최대 100자까지 입력 가능합니다"),
    category: Yup.string().required("카테고리를 선택해주세요"),
    thumbnail: Yup.string().required("썸네일을 업로드해주세요"),
    content: Yup.string().required("내용을 입력해주세요"),
});

export type BlogFormValues = Yup.InferType<typeof blogSchema>;

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
                title: "활동 유형 선택",
                fields: [
                    {
                        name: "category",
                        type: "radio",
                        label: "활동유형",
                        required: true,
                        options: [
                            { label: "아이디어톤", value: "아이디어톤" },
                            { label: "중앙 해커톤", value: "중앙해커톤" },
                            { label: "연합 해커톤", value: "연합해커톤" },
                            { label: "장기 프로젝트", value: "장기프로젝트" },
                            { label: "기타", value: "기타" },
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
        },
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            console.log("Blog post submitted:", values);
            await new Promise((resolve) => setTimeout(resolve, 2000));
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
