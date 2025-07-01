"use client";
import Section from "@/components/ui/Section";
import CalendarView from "./components/CalendarView";
import DirectionButtonSVG from "@/assets/about/calendar/btn_direction.svg";
import { useState } from "react";

export default function Calendar() {
    const [month, setMonth] = useState(2);

    const handlePrev = () => setMonth((p) => (p > 2 ? p - 1 : p));
    const handleNext = () => setMonth((p) => (p < 12 ? p + 1 : p));

    return (
        <Section
            displayName="Calendar"
            displayTitle="올해의 멋사는 이렇게 운영되고 있어요"
            theme="LIGHT"
            className="py-50"
        >
            {/* 이 div를 기준으로 버튼을 절대 위치시킵니다 */}
            <div className="relative w-full flex justify-center">
                {/* 캘린더 고정 너비 */}
                <div className="flex-shrink-0 w-[840px]">
                    <CalendarView month={month} />
                </div>

                {/* 왼쪽 버튼: 페이지 왼쪽에서 100px, 수직 중앙 */}
                <button
                    onClick={handlePrev}
                    disabled={month === 2}
                    aria-label="이전 달"
                    className="absolute left-[100px] top-1/2 -translate-y-1/2"
                >
                    <DirectionButtonSVG className="size-8 md:size-13" />
                </button>

                {/* 오른쪽 버튼: 페이지 오른쪽에서 100px, 수직 중앙 */}
                <button
                    onClick={handleNext}
                    disabled={month === 12}
                    aria-label="다음 달"
                    className="absolute right-[100px] top-1/2 -translate-y-1/2"
                >
                    <DirectionButtonSVG className="size-8 md:size-13 rotate-180" />
                </button>
            </div>
        </Section>
    );
}
