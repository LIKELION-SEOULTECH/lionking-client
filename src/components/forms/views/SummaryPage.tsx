import GenericFormPage from "../common/GenericFormPage";
import { GenericFormPageConfig } from "../types/FormConfig.types";
import * as Yup from "yup";
import Icons from "@/assets/banner/archive/blog/icons.svg";

// type SummaryPageProps = {
//     content: string;
// };

export default function SummaryPage() {
    return (
        <>
            <SummaryResult goal="어쩌구" summary="저쩌구" />
        </>
    );
}

// function Pending() {
//     return (
//         <div className="w-full h-[90vh] bg-white flex items-center justify-center">
//             <div className="flex flex-col items-center justify-center gap-8">
//                 <div className="flex flex-col items-center justify-center gap-3">
//                     <div className="size-30 rounded-full bg-orange-main" />
//                     <h1 className="body1_sb text-gray-8">블로그 내용을 분석하고 있어요</h1>
//                 </div>

//                 <p>멋사 AI가 블로그 내용을 빠르게 요약 정리 해드려요</p>
//             </div>
//         </div>
//     );
// }

const blogSummaryEditSchema = Yup.object({
    goal: Yup.string().required("내용을 입력해주세요."),
    summary: Yup.string().required("내용을 입력해주세요."),
});

type blogSummaryEditFormValues = Yup.InferType<typeof blogSummaryEditSchema>;

type SummaryResultProps = {
    goal?: string;
    summary?: string;
};

function SummaryResult({ goal, summary }: SummaryResultProps) {
    const blogSummaryEditFormConfig: GenericFormPageConfig<blogSummaryEditFormValues> = {
        banner: {
            title: "블로그 작성하기",
            icon: <Icons />,
        },
        form: {
            sections: [
                {
                    title: "이 글을 읽고 나면?",
                    description: "글의 초반에 독자들의 흥미를 이끄는 부분이에요.",
                    fields: [
                        {
                            name: "goal",
                            type: "textarea",
                            label: "goal",
                            placeholder: "내용을 입력하세요",
                            required: true,
                        },
                    ],
                },

                {
                    title: "포스팅 요약",
                    description: "글의 마지막에 내용을 상기시키는 부분이에요.",
                    fields: [
                        {
                            name: "summary",
                            type: "textarea",
                            label: "summary",
                            placeholder: "내용을 입력하세요",
                            required: true,
                        },
                    ],
                },
            ],
            initialValues: {
                goal: goal || "요약에 실패했습니다.",
                summary: summary || "요약에 실패했습니다.",
            },
            validationSchema: blogSummaryEditSchema,
            onSubmit: async (values) => {
                console.log("Notice submitted:", values);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            },
            submitButtonText: "등록하기",
            successConfig: {
                title: "블로그 등록이 완료되었습니다.",
                buttonLabel: "블로그 보러가기",
                href: "/archive/blog",
            },
        },
    };

    return <GenericFormPage config={blogSummaryEditFormConfig} />;
}
