import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/gallery/icons.svg";
import { extractFilePathFromS3Url } from "@/lib/utils";
import { NewsRequest } from "@/types";

const gallerySchema = Yup.object({
    title: Yup.string().required("게시물 제목을 입력해주세요"),
    content: Yup.string().required("활동 내용을 입력해주세요"),
    photos: Yup.array().of(Yup.string()).required("활동 사진을 업로드해주세요"),
});

export type GalleryFormValues = Yup.InferType<typeof gallerySchema>;

export function generatePostGalleryRequest(form: GalleryFormValues): NewsRequest {
    return {
        title: form.title,
        content: form.content,
        contentMedia: form.photos.map((photo) => ({
            s3Key: photo ? extractFilePathFromS3Url(photo) : "",
            mediaType: "IMAGE",
            mediaOwner: "ACTIVITY",
            ownerId: 0,
        })),
    };
}

export function generateGalleryFormConfig({
    isEdit = false,
    galleryId,
    authorId,
}: {
    isEdit?: boolean;
    galleryId?: number | string;
    authorId?: number | string;
}): GenericFormPageConfig<GalleryFormValues> {
    return {
        banner: {
            title: isEdit ? "활동기록 수정하기" : "활동기록 등록하기",
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
                const reqBody = generatePostGalleryRequest(values);

                console.log("Request Body:", reqBody);

                const url = isEdit
                    ? `/api/gallery/${galleryId}`
                    : `/api/gallery/upload/${authorId}`;

                const method = isEdit ? "PATCH" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "활동기록 처리 중 오류가 발생했습니다.");
                }

                return response.json();
            },
            submitButtonText: isEdit ? "수정하기" : "등록하기",
            successConfig: {
                title: isEdit ? "활동기록이 수정되었습니다." : "활동기록이 등록되었습니다.",
                buttonLabel: isEdit ? "수정된 활동기록 보기" : "활동기록 보러가기",
                href: "/gallery",
            },
        },
    };
}
