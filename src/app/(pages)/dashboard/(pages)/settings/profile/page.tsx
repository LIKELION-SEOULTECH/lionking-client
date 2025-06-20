"use client";

import { Formik, Form, FieldArray } from "formik";
import { ProfileSettingForm as F } from "./components/ProfileSettingForm";
import ProfileSettingSection from "./components/ProfileSettingSection";
import { PortfolioInputGroup } from "./components/PortfolioInputGroup";
import type { PortfolioEntry } from "./types";
import ImpSmall from "@/assets/icons/imp_small.svg";

export default function ProfileSettingsPage() {
    return (
        <div className="overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-30">
                    <div className="flex flex-col items-start justify-center w-full gap-4">
                        <h1 className="head2_b text-white w-full">내 프로필 수정</h1>
                        <p className="sub2_sb text-gray-4">
                            기본 정보와 내 멤버 프로필 페이지를 수정하실 수 있습니다.
                        </p>
                    </div>

                    <Formik
                        initialValues={{
                            name: "",
                            major: "",
                            role: "운영진",
                            part: "",
                            tags: [],
                            intro: "",
                            skills: "",
                            portfolios: [{ type: "", url: "" }] as PortfolioEntry[],
                        }}
                        onSubmit={(values) => console.log(values)}
                    >
                        <Form className="w-full flex flex-col items-start justify-start gap-35">
                            <ProfileSettingSection title="기본 정보">
                                <div className="w-full flex items-center gap-12">
                                    <p className="sub1_sb">이름</p>
                                    <F.Input name="name" placeholder="김사자" />
                                </div>

                                <div className="w-full flex items-center gap-12">
                                    <p className="sub1_sb">전공</p>
                                    <F.Input name="major" placeholder="사자키우기전공" />
                                </div>

                                <div className="w-full flex items-center gap-12">
                                    <p className="sub1_sb">직책</p>
                                    <F.RadioGroup
                                        name="role"
                                        options={[
                                            { label: "운영진", value: "운영진" },
                                            { label: "아기사자", value: "아기사자" },
                                        ]}
                                    />
                                </div>

                                <div className="w-full flex items-center gap-12">
                                    <p className="sub1_sb">파트</p>
                                    <F.Select
                                        name="part"
                                        options={[
                                            { label: "파트를 선택해주세요", value: "" },
                                            { label: "기획", value: "기획" },
                                            { label: "디자인", value: "디자인" },
                                            { label: "프론트엔드", value: "프론트엔드" },
                                            { label: "백엔드", value: "백엔드" },
                                            { label: "AI", value: "AI" },
                                        ]}
                                    />
                                </div>
                            </ProfileSettingSection>

                            <ProfileSettingSection title="내 소개">
                                <div className="w-full flex flex-col items-start justify-start gap-4 py-8">
                                    <div className="w-full flex items-center justify-start gap-6">
                                        <p className="head4_b">소개 태그</p>
                                        <div className="flex items-center gap-[5px]">
                                            <ImpSmall />
                                            <p className="sub4_sb text-gray-2">
                                                최대 3개를 선택해주세요
                                            </p>
                                        </div>
                                    </div>
                                    <F.TagSelector
                                        name="tags"
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
                                    <p className="head4_b">소개글</p>
                                    <F.TextArea
                                        name="intro"
                                        placeholder="소개글을 입력해주세요 (공백 포함 100자 이내)"
                                        limit={100}
                                    />
                                </div>

                                <div className="w-full flex flex-col items-start justify-start gap-4">
                                    <p className="head4_b">기술</p>
                                    <F.TextArea
                                        name="skills"
                                        placeholder="사용 가능한 기술을 입력해주세요"
                                    />
                                </div>
                            </ProfileSettingSection>

                            <ProfileSettingSection title="포트폴리오">
                                <div className="w-full flex flex-col items-start justify-start gap-3">
                                    <div className="flex items-center gap-[5px]">
                                        <ImpSmall />
                                        <p className="sub4_sb text-gray-2">
                                            최대 3개까지 추가할 수 있어요
                                        </p>
                                    </div>

                                    <FieldArray name="portfolios">
                                        {({ push, remove, form }) => (
                                            <div className="flex flex-col gap-4 w-full">
                                                {form.values.portfolios.map(
                                                    (_entry: PortfolioEntry, index: number) => (
                                                        <PortfolioInputGroup
                                                            key={index}
                                                            index={index}
                                                            showRemove={
                                                                form.values.portfolios.length > 1
                                                            }
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
                                    저장하기
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
