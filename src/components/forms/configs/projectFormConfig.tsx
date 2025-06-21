import * as Yup from "yup";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import Icons from "@/assets/banner/archive/projects/icons.svg";

export const projectValidationSchema = Yup.object({
    projectName: Yup.string()
        .required("프로젝트명을 입력해주세요")
        .max(30, "최대 30자까지 입력 가능합니다"),
    projectType: Yup.string().required("활동 유형을 선택해주세요"),
    projectYear: Yup.string().required("활동 기수를 선택해주세요"),
    projectDescription: Yup.string()
        .required("프로젝트 소개를 입력해주세요")
        .max(300, "최대 300자까지 입력 가능합니다"),
    projectVideo: Yup.string().url("올바른 URL 형식이 아닙니다"),
    projectMembers: Yup.array()
        .min(1, "최소 1명 이상의 멤버를 선택해주세요")
        .required("참여 멤버를 선택해주세요"),
    projectThumbnail: Yup.string().required("썸네일을 업로드해주세요"),
    projectLandingImages: Yup.array()
        .min(1, "최소 1장 이상의 이미지를 업로드해주세요")
        .max(20, "최대 20장까지 업로드 가능합니다")
        .required("랜딩 이미지를 업로드해주세요"),
    projectRecaps: Yup.array().of(
        Yup.object({
            content: Yup.string()
                .required("회고 내용을 입력해주세요")
                .max(300, "최대 300자까지 입력 가능합니다"),
        })
    ),
});

export type ProjectFormValues = Yup.InferType<typeof projectValidationSchema>;

export const projectFormConfig: GenericFormPageConfig<ProjectFormValues> = {
    banner: {
        title: "프로젝트 등록하기",
        icon: <Icons />,
    },
    form: {
        sections: [], // 프젝회고 기능때문에 별도로 custom 처리함
        initialValues: {
            projectName: "",
            projectType: "",
            projectDescription: "",
            projectYear: "",
            projectVideo: "",
            projectMembers: [],
            projectThumbnail: "",
            projectLandingImages: [],
            projectRecaps: [],
        },
        validationSchema: projectValidationSchema,
        onSubmit: async (values) => {
            console.log("Project submitted:", values);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        },
        submitButtonText: "등록하기",
        successConfig: {
            title: "프로젝트 등록이 완료되었습니다.",
            buttonLabel: "프로젝트 보러가기",
            href: "/archive/projects",
        },
    },
};
