"use client";

import { useEffect } from "react";
import { Form, useFormikContext } from "formik";
import { FormSection, Input, TextArea, Select, RadioGroup } from "../common/FormComponents";
import ImageDropZone from "../common/ImageDropZone";
import MemberSelector from "../common/MemberSelector";
import type { ProjectParticipant, ProjectTypeEnum } from "@/types";

type ProjectRecap = {
    member: ProjectParticipant;
    content: string;
};

export default function ProjectFormWithRecaps() {
    const _currentYear = new Date().getFullYear();
    const _startYear = 2024;
    const yearOptions = Array.from({ length: _currentYear - _startYear + 1 }, (_, i) => {
        const label = `${12 + i}기`;
        return { value: 12 + i, label };
    });

    const { values, setFieldValue, isValid, isSubmitting, dirty } = useFormikContext<{
        projectName: string;
        projectType: ProjectTypeEnum;
        projectDescription: string;
        projectYear: number;
        projectVideo: string;
        projectMembers: ProjectParticipant[];
        projectThumbnail: string;
        projectLandingImages: string[];
        projectRecaps: ProjectRecap[];
    }>();

    useEffect(() => {
        const currentRecaps = values.projectRecaps;
        const members = values.projectMembers;

        const recapMap = new Map(currentRecaps.map((recap) => [recap.member.memberId, recap]));

        const newRecaps = members.map((member) => {
            const existingRecap = recapMap.get(member.memberId);
            return (
                existingRecap || {
                    member: {
                        memberId: member.memberId,
                        username: member.username,
                        positionLabel: member.positionLabel || "",
                    },
                    content: "",
                }
            );
        });

        if (JSON.stringify(newRecaps) !== JSON.stringify(currentRecaps)) {
            setFieldValue("projectRecaps", newRecaps);
        }
    }, [values.projectMembers, values.projectRecaps, setFieldValue]);

    return (
        <Form className="flex flex-col gap-12">
            <FormSection title="프로젝트명" isRequired>
                <Input
                    name="projectName"
                    placeholder="제목을 입력하세요"
                    className="w-full"
                    limit={30}
                />
            </FormSection>

            <FormSection title="활동 유형 선택" isRequired>
                <RadioGroup
                    name="projectType"
                    options={[
                        { label: "아이디어톤", value: "IDEATHON" },
                        { label: "중앙 해커톤", value: "CENTRAL_HACKATHON" },
                        { label: "연합 해커톤", value: "UNION_HACKATHON" },
                        { label: "장기 프로젝트", value: "LONG_TERM" },
                        { label: "기타", value: "ETC" },
                    ]}
                />
            </FormSection>

            <FormSection title="활동 기수 선택" isRequired>
                <Select
                    name="projectYear"
                    options={[{ value: 0, label: "기수 선택" }, ...yearOptions]}
                />
            </FormSection>

            <FormSection title="프로젝트 소개" isRequired>
                <TextArea
                    name="projectDescription"
                    placeholder="내용을 입력하세요"
                    className="w-full"
                    limit={300}
                />
            </FormSection>

            <FormSection title="시연 영상 링크">
                <Input name="projectVideo" placeholder="시연 영상 링크" className="w-full" />
            </FormSection>

            <FormSection title="참여 멤버" isRequired>
                <MemberSelector name="projectMembers" />
            </FormSection>

            <FormSection title="썸네일" description="권장 이미지 크기: 1920 x 1080 px" isRequired>
                <ImageDropZone name="projectThumbnail" multiple={false} />
            </FormSection>

            <FormSection
                title="랜딩 이미지"
                description="최대 20장까지 업로드할 수 있습니다."
                isRequired
            >
                <ImageDropZone name="projectLandingImages" multiple={true} maxFiles={20} />
            </FormSection>

            {values.projectRecaps.length > 0 && (
                <FormSection title="프로젝트 회고" isRequired>
                    <div className="w-full flex flex-col gap-8">
                        {values.projectRecaps.map((recap, index) => (
                            <div key={recap.member.memberId} className="w-full">
                                <div className="mb-2 flex gap-2 body3_m">
                                    <span className="text-orange-main">
                                        {recap.member.positionLabel || ""}
                                    </span>
                                    <span className="text-black">{recap.member.username}</span>
                                </div>
                                <TextArea
                                    name={`projectRecaps[${index}].content`}
                                    placeholder="내용을 입력하세요"
                                    className="w-full"
                                    limit={300}
                                />
                            </div>
                        ))}
                    </div>
                </FormSection>
            )}

            <div className="w-full flex justify-center mt-50">
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting || !dirty}
                    className="py-3 px-22.5 bg-orange-main sub3_sb text-white rounded-[8px] hover:bg-orange-main/85 transition-colors duration-200 cursor-pointer disabled:bg-gray-3 disabled:cursor-not-allowed disabled:hover:bg-gray-3 flex items-center justify-center gap-2 min-w-[120px] h-[48px]"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>등록 중...</span>
                        </>
                    ) : (
                        <span className="inline-block w-[72px] text-center">등록하기</span>
                    )}
                </button>
            </div>
        </Form>
    );
}
