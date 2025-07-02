import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/notice/icons.svg";

const noticeSchema = Yup.object({
    noticeType: Yup.string().required("공지 유형을 선택해주세요"),
    title: Yup.string().required("제목을 입력해주세요"),
    content: Yup.string().required("내용을 입력해주세요"),
    attachments: Yup.array().of(Yup.string()).required("첨부파일을 업로드해주세요"),
});

export type NoticeFormValues = Yup.InferType<typeof noticeSchema>;

export const noticeFormConfig: GenericFormPageConfig<NoticeFormValues> = {
    banner: {
        title: "공지사항 작성하기",
        icon: <Icons />,
    },
    form: {
        sections: [
            {
                title: "공지 유형",
                fields: [
                    {
                        name: "noticeType",
                        type: "radio",
                        label: "공지 유형",
                        required: true,
                        options: [
                            { label: "일반 공지", value: "general" },
                            { label: "중요 공지", value: "important" },
                            { label: "긴급 공지", value: "urgent" },
                        ],
                    },
                ],
            },
            {
                title: "제목",
                fields: [
                    {
                        name: "title",
                        type: "text",
                        label: "제목",
                        placeholder: "제목을 입력하세요",
                        required: true,
                    },
                ],
            },
            {
                title: "파일첨부 (최대3개)",
                fields: [
                    {
                        name: "attachments",
                        type: "imageDropzone",
                        label: "첨부파일",
                        multiple: true,
                        maxFiles: 3,
                        accept: "image/*,application/pdf",
                    },
                ],
            },
            {
                title: "내용 입력",
                fields: [
                    {
                        name: "content",
                        type: "textarea",
                        label: "내용",
                        placeholder: "내용을 입력하세요",
                        required: true,
                    },
                ],
            },
        ],
        initialValues: {
            noticeType: "",
            title: "",
            content: "",
            attachments: [],
        },
        validationSchema: noticeSchema,
        onSubmit: async (values) => {
            const payload = {
                noticeType: values.noticeType === "important" ? "IMPORTANT" : "GENERAL",
                title: values.title,
                content: values.content,
                contentMedia: (values.attachments as string[]).map((k) => ({
                    s3Key: k,
                    mediaType: "IMAGE",
                })),
            };

            const res = await fetch("/api/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
        },

        submitButtonText: "공지하기",
        successConfig: {
            title: "공지사항이 등록되었습니다.",
            buttonLabel: "공지사항 목록 보기",
            href: "/notice",
        },
    },
};
