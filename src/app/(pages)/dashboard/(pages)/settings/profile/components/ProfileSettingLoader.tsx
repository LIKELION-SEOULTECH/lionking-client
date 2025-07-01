"use client";

import { Formik } from "formik";
import ProfileSettingSection from "./ProfileSettingSection";
import { PortfolioInputGroup } from "./PortfolioInputGroup";
import { ProfileSettingForm as F } from "./ProfileSettingForm";
import ImpSmall from "@/assets/icons/imp_small.svg";
import { Form, FieldArray } from "formik";
import type { PortfolioEntry } from "../types";
import { use, useTransition } from "react";
import { Member } from "@/types";
import { put_member_memberId } from "@/lib/api/endpoints/member";
import { toast } from "sonner";

export default function ProfileSettingLoader({
    memberDataPromise,
    memberId,
}: {
    memberDataPromise: Promise<Member>;
    memberId: number;
}) {
    const data = use(memberDataPromise);

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (values: any) => {
        const flattenedDescriptionTag = values.descriptionTag
            .map((tag: string) => `#${tag.trim()}`)
            .join(", ");

        const flattenedPortfolioUrls = values.portfolioUrls
            .filter((entry: PortfolioEntry) => entry.type && entry.url)
            .map((entry: PortfolioEntry) => `${entry.type}:${entry.url}`)
            .join(", ");

        const payload = {
            ...values,
            descriptionTag: flattenedDescriptionTag,
            portfolioUrls: flattenedPortfolioUrls,
        };
        console.log(payload);

        startTransition(async () => {
            const result = await put_member_memberId(memberId, payload);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Formik
            initialValues={{
                username: data.name ?? "",
                profileImage: data.imageUrl ?? "",
                department: data.major ?? "",
                role: data.role ?? "",
                position: data.position ?? "",
                descriptionTag: data.profileIntroTags ?? [],
                description: data.profileIntro ?? "",
                techStack: data.profileIntroSkills ?? "",
                portfolioUrls: data.profileExternalLinks?.length
                    ? data.profileExternalLinks
                    : [{ type: "", url: "" }],
            }}
            onSubmit={handleSubmit}
        >
            <Form className="w-full flex flex-col items-start justify-start gap-35">
                <ProfileSettingSection title="기본 정보">
                    <div className="w-full flex items-center gap-12">
                        <p className="body3_m">이름</p>
                        <F.Input name="username" placeholder="김사자" />
                    </div>

                    <div className="w-full flex items-center gap-12">
                        <p className="body3_m">전공</p>
                        <F.Input name="department" placeholder="사자키우기전공" />
                    </div>

                    <div className="w-full flex items-center gap-12">
                        <p className="body3_m">직책</p>
                        <F.RadioGroup
                            name="role"
                            options={[
                                { label: "게스트", value: "GUEST" },
                                { label: "운영진", value: "MANAGER" },
                                { label: "아기사자", value: "MEMBER" },
                                { label: "대표", value: "REPRESENTATIVE" },
                                { label: "휴면사자", value: "PREVIOUS" },
                            ]}
                        />
                    </div>

                    <div className="w-full flex items-center gap-12">
                        <p className="body3_m">파트</p>
                        <F.Select
                            name="position"
                            options={[
                                { label: "파트를 선택해주세요", value: "" },
                                { label: "기획", value: "PLAN" },
                                { label: "디자인", value: "DESIGN" },
                                { label: "프론트엔드", value: "FRONTEND" },
                                { label: "백엔드", value: "BACKEND" },
                                { label: "AI", value: "AI" },
                            ]}
                        />
                    </div>
                </ProfileSettingSection>

                <ProfileSettingSection title="내 소개">
                    <div className="w-full flex flex-col items-start justify-start gap-4 pb-8">
                        <div className="w-full flex items-center justify-start gap-6">
                            <p className="body2_sb">소개 태그</p>
                            <div className="flex items-center gap-[5px]">
                                <ImpSmall />
                                <p className="body5_r text-gray-2">최대 3개를 선택해주세요</p>
                            </div>
                        </div>
                        <F.TagSelector
                            name="descriptionTag"
                            options={[
                                "긍정적인",
                                "쾌활한",
                                "열정적인",
                                "꼼꼼한",
                                "성실한",
                                "책임감 있는",
                                "도전적인",
                                "창의적인",
                                "주도적인",
                                "끈기 있는",
                                "소통을 잘하는",
                                "분위기메이커",
                            ]}
                        />
                    </div>

                    <div className="w-full flex flex-col items-start justify-start gap-4">
                        <p className="body2_sb">소개글</p>
                        <F.TextArea
                            name="description"
                            placeholder="소개글을 입력해주세요 (공백 포함 100자 이내)"
                            limit={100}
                        />
                    </div>

                    <div className="w-full flex flex-col items-start justify-start gap-4">
                        <p className="body2_sb">기술</p>
                        <F.TextArea
                            name="techStack"
                            placeholder="사용 가능한 기술을 입력해주세요"
                        />
                    </div>
                </ProfileSettingSection>

                <ProfileSettingSection title="포트폴리오">
                    <div className="w-full flex flex-col items-start justify-start gap-3">
                        <div className="flex items-center gap-[5px]">
                            <ImpSmall />
                            <p className="body5_r text-gray-2">최대 3개까지 추가할 수 있어요</p>
                        </div>

                        <FieldArray name="portfolioUrls">
                            {({ push, remove, form }) => (
                                <div className="flex flex-col gap-4 w-full">
                                    {form.values.portfolioUrls.map(
                                        (_entry: PortfolioEntry, index: number) => (
                                            <PortfolioInputGroup
                                                key={index}
                                                index={index}
                                                showRemove={form.values.portfolioUrls.length > 1}
                                                onRemove={() => remove(index)}
                                            />
                                        )
                                    )}

                                    <div className="flex items-center justify-center w-full mt-16">
                                        <button
                                            type="button"
                                            onClick={() => push({ type: "", url: "" })}
                                            className="transition-transform duration-200 ease-in-out hover:scale-[1.1] active:scale-[0.95] cursor-pointer"
                                        >
                                            <svg
                                                width="53"
                                                height="53"
                                                viewBox="0 0 53 53"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="26.5"
                                                    cy="26.5"
                                                    r="26.5"
                                                    fill="#C4C4C4"
                                                />
                                                <path
                                                    d="M14.1379 27.1394H40.1355"
                                                    stroke="#787471"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M27.1361 14.1418L27.1361 40.1394"
                                                    stroke="#787471"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </ProfileSettingSection>

                <div className="flex items-center justify-center w-full mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-orange-main text-white rounded-md hover:bg-orange-main/80 transition-colors duration-200 cursor-pointer"
                    >
                        {isPending ? "저장 중..." : "저장하기"}
                    </button>
                </div>
            </Form>
        </Formik>
    );
}
