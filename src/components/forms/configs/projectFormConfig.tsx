import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/archive/projects/icons.svg";
import { PostProjectRequest } from "@/lib/api/endpoints/project";
import { ProjectParticipant, ProjectTypeEnum } from "@/types";
import { extractFilePathFromS3Url } from "@/lib/utils";

export const projectValidationSchema = Yup.object({
    projectName: Yup.string()
        .required("프로젝트명을 입력해주세요")
        .max(30, "최대 30자까지 입력 가능합니다"),
    projectType: Yup.string().required("활동 유형을 선택해주세요"),
    projectYear: Yup.number().required("활동 기수를 선택해주세요"),
    projectDescription: Yup.string()
        .required("프로젝트 소개를 입력해주세요")
        .max(300, "최대 300자까지 입력 가능합니다"),
    projectVideo: Yup.string().url("올바른 URL 형식이 아닙니다"),
    projectMembers: Yup.array<ProjectParticipant>()
        .min(1, "최소 1명 이상의 멤버를 선택해주세요")
        .required("참여 멤버를 선택해주세요"),
    projectThumbnail: Yup.string().required("썸네일을 업로드해주세요"),
    projectLandingImages: Yup.array()
        .min(1, "최소 1장 이상의 이미지를 업로드해주세요")
        .max(20, "최대 20장까지 업로드 가능합니다")
        .required("랜딩 이미지를 업로드해주세요"),
    projectRecaps: Yup.array().of(
        Yup.object({
            member: Yup.object({
                memberId: Yup.number().required(),
                username: Yup.string().required(),
                positionLabel: Yup.string(),
            }),
            content: Yup.string()
                .required("회고 내용을 입력해주세요")
                .max(300, "최대 300자까지 입력 가능합니다"),
        })
    ),
});

export type ProjectFormValues = Yup.InferType<typeof projectValidationSchema>;

export function generatePostProjectRequest(form: ProjectFormValues): PostProjectRequest {
    return {
        projectName: form.projectName,
        projectType: form.projectType as ProjectTypeEnum,
        generation: form.projectYear,
        projectDescription: form.projectDescription,
        videoLink: form.projectVideo || "",
        memberRetrospection: form.projectRecaps?.map((retrospection) => ({
            memberId: retrospection.member.memberId,
            retrospection: retrospection.content,
        }))!,
        memberIds: form.projectMembers.map((member) => member.memberId),
        thumbnailImageKey: extractFilePathFromS3Url(form.projectThumbnail),
        landingImagesKeys: form.projectLandingImages.map(extractFilePathFromS3Url),
    };
}

export function getProjectFormConfig({
    isEdit = false,
    projectId,
}: {
    isEdit?: boolean;
    projectId?: number | string;
}): GenericFormPageConfig<ProjectFormValues> {
    return {
        banner: {
            title: isEdit ? "프로젝트 수정하기" : "프로젝트 등록하기",
            icon: <Icons />,
        },
        form: {
            sections: [],
            initialValues: {
                projectName: "",
                projectType: "",
                projectDescription: "",
                projectYear: 0,
                projectVideo: "",
                projectMembers: [],
                projectThumbnail: "",
                projectLandingImages: [],
                projectRecaps: [],
            },
            validationSchema: projectValidationSchema,
            onSubmit: async (values) => {
                const reqBody = generatePostProjectRequest(values);

                console.log("Request Body:", reqBody);

                const url = isEdit ? `/api/projects/${projectId}` : `/api/projects`;

                const method = isEdit ? "PATCH" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "프로젝트 처리 중 오류가 발생했습니다.");
                }

                return response.json();
            },
            submitButtonText: isEdit ? "수정하기" : "등록하기",
            successConfig: {
                title: isEdit
                    ? "프로젝트 수정이 완료되었습니다."
                    : "프로젝트 등록이 완료되었습니다.",
                buttonLabel: isEdit ? "수정된 프로젝트 보기" : "프로젝트 보러가기",
                href: "/archive/projects",
            },
        },
    };
}
