"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import MainActivityCard, { MainActivityCardContent } from "./components/MainActivityCard";
import ScrollBeam from "./components/ScrollBeam";

const cardContents: MainActivityCardContent[] = [
    {
        title: "파트별로 진행 되는 개별 세션",
        description:
            "운영진을 중심으로 운영되는 강의와 과제 수행을 통해 파트에 필요한 능력을 함양할 수 있어요.",
        badge: "정기세션",
        imageSrc: "/static/images/about/img1.png",
    },
    {
        title: "배우고, 나누고, 성장하기",
        description: "파트별 스터디를 통해 서로의 지식을 나누고 배우며 함께 성장해요.",
        badge: "스터디",
        imageSrc: "/static/images/about/img2.png",
    },
    {
        title: "오직 아이디어로 승부하다",
        description:
            "활동 중 가장 처음으로 진행되는 연합 행사로, 전국 멋대 회원들이 모여 아이디어를 뽐내는 행사예요.",
        badge: "중앙 아이디어톤",
        imageSrc: "/static/images/about/img3.png",
    },
    {
        title: "멋대의 꽃, 해커톤",
        description:
            "중앙 해커톤은 무박 2일 간 멋대 전체 인원이 모여 서비스를 구현하는 멋대의 가장 큰 행사예요.",
        badge: "중앙 해커톤",
        imageSrc: "/static/images/about/img4.png",
    },
    {
        title: "기획부터 배포까지, 실전 프로젝트",
        description:
            "1학기의 배움과 경험을 바탕으로, 자유주제로 기획부터 배포까지 진행하는  장기 프로젝트를 통해 실전 경험을 쌓아요.",
        badge: "장기 프로젝트",
        imageSrc: "/static/images/about/img5.png",
    },
    {
        title: "진정한 협업을 위한 네트워킹",
        description:
            "매년 진행되는 MT를 통하여 모든 파트의 동아리원들과 친목을 다지는 시간을 가져요.",
        badge: "MT",
        imageSrc: "/static/images/about/img6.png",
    },
];

export default function MainActivities() {
    const cardCount = 5;
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const stackRef = useRef<HTMLDivElement>(null);
    const [circleTops, setCircleTops] = useState<number[]>([]);

    useEffect(() => {
        const onScroll = () => {
            const centerY = window.innerHeight / 2;
            let closest = 0;
            let minDist = Infinity;

            cardRefs.current.forEach((ref, i) => {
                if (!ref) return;
                const rect = ref.getBoundingClientRect();
                const dist = Math.abs(centerY - (rect.top + rect.height / 2));
                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });
            setFocusedIndex(closest);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const measureCircles = () => {
            if (!stackRef.current) return;
            const containerRect = stackRef.current.getBoundingClientRect();
            const containerTop = containerRect.top + window.scrollY;
            const tops = cardRefs.current.map((ref) => {
                if (!ref) return 0;
                const r = ref.getBoundingClientRect();
                return r.top + r.height / 2 + window.scrollY - containerTop;
            });
            setCircleTops(tops);
        };

        window.addEventListener("scroll", measureCircles, { passive: true });
        window.addEventListener("resize", measureCircles);
        measureCircles();
        return () => {
            window.removeEventListener("scroll", measureCircles);
            window.removeEventListener("resize", measureCircles);
        };
    }, []);

    return (
        <Section
            displayName="Main Activities"
            displayTitle="배우고, 상상하고, 실현하다"
            className="py-[200px] relative"
        >
            <div className="relative flex pr-4 ml:pr-0">
                <ScrollBeam
                    targetRef={stackRef}
                    circleTops={circleTops}
                    focusedIndex={focusedIndex}
                />
                <div
                    ref={stackRef}
                    className="flex flex-col gap-[120px] ml-8 lg:ml-12 w-full relative"
                >
                    {cardContents.map((content, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="w-full pl-4 md:pl-8"
                        >
                            <MainActivityCard
                                isFocused={focusedIndex === index}
                                content={content}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
