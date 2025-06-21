import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/gallery/icons.svg";

const gallerySchema = Yup.object({
    title: Yup.string().required("게시물 제목을 입력해주세요"),
    content: Yup.string().required("활동 내용을 입력해주세요"),
    photos: Yup.array().of(Yup.string()).required("활동 사진을 업로드해주세요"),
});

type GalleryFormValues = Yup.InferType<typeof gallerySchema>;

export const galleryFormConfig: GenericFormPageConfig<GalleryFormValues> = {
    banner: {
        title: "활동기록 등록하기",
        icon: <Icons />,
    },
    form: {
        sections: [
            {
                title: "게시물 제목",
                fields: [
                    {
                        name: "title",
                        type: "text",
                        label: "제목",
                        placeholder: "제목을 입력하세요",
                        required: true,
                        limit: 30,
                    },
                ],
            },
            {
                title: "활동 내용",
                fields: [
                    {
                        name: "content",
                        type: "textarea",
                        label: "내용",
                        placeholder: "내용을 입력하세요",
                        required: true,
                        limit: 300,
                    },
                ],
            },
            {
                title: "활동 사진 ",
                description: "최대 10장까지 업로드할 수 있습니다.",
                fields: [
                    {
                        name: "photos",
                        type: "imageDropzone",
                        label: "활동사진",
                        multiple: true,
                        maxFiles: 10,
                        accept: "image/*",
                    },
                ],
            },
        ],
        initialValues: {
            title: "",
            content: "",
            photos: [],
        },
        validationSchema: gallerySchema,
        onSubmit: async (values) => {
            console.log("Gallery submitted:", values);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        },
        submitButtonText: "등록하기",
        successConfig: {
            title: "활동 기록이 등록되었습니다.",
            buttonLabel: "활동 기록 보러가기",
            href: "/gallery",
        },
    },
};
