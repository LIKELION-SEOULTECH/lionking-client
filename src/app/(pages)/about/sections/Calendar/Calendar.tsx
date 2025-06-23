import Section from "@/components/ui/Section";
import CalendarView from "./components/CalendarView";
import DirectionButtonSVG from "@/assets/about/calendar/btn_direction.svg";

export default function Calendar() {
    return (
        <Section
            displayName="Calendar"
            displayTitle="올해의 멋사는 이렇게 운영되고 있어요"
            theme="LIGHT"
            className="py-50"
        >
            <div className="w-full max-w-[1100px] flex items-center justify-center gap-4 px-6">
                <DirectionButtonSVG className="size-8 md:size-13" />
                <CalendarView />
                <DirectionButtonSVG className="size-8 md:size-13 rotate-180" />
            </div>
        </Section>
    );
}
