import Section from "@/components/ui/Section";
import ActivityGrid from "./components/ActivityGrid";
import type { ActivityCardProps } from "./components/ActivityCard";

const ActivityContents: ActivityCardProps[] = [
    {
        title: "파트별 세션",
        description: "파트별로 진행되는 실무 중심 교육으로 프로젝트에 필요한 활동 지식을 쌓아요.",
        backgroundImage: "/static/images/home/img1.png",
    },
    {
        title: "스터디",
        description: "파트별 스터디를 통해 서로의 지식을 나누고 배우며 함께 성장해요.",
        backgroundImage: "/static/images/home/img2.png",
    },
    {
        title: "실전 프로젝트",
        description: "다른 파트 회원들과 함께하는 팀 프로젝트를 통해 실전 경험을 쌓아요.",
        backgroundImage: "/static/images/home/img3.png",
    },
    {
        title: "연합 프로젝트",
        description:
            "아이디어톤부터 해커톤까지, 연합 행사를 통해 전국 50여 개 멋쟁이사자처럼 회원들과 열정을 나눠요.",
        backgroundImage: "/static/images/home/img4.png",
    },
];

export default function Activities() {
    return (
        <Section
            displayName="Activities"
            displayTitle="멋사의 활동은 이렇게 진행됩니다"
            displayDescription={[
                "파트별 실무 교육부터 실전 프로젝트까지,",
                "다양한 프로그램을 통한 빠른 성장을 경험해보세요.",
            ]}
            className="relative py-16 sm:py-20 md:py-24"
        >
            <ActivityGrid items={ActivityContents} />
        </Section>
    );
}
