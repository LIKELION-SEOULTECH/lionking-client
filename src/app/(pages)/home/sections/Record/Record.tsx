import Section from "@/components/ui/Section";
import CardNumberRow from "./components/CardNumberRow";
import RecordSectionBackground from "./components/RecordSectionBackground";
import MainPageBackground from "@/assets/main_bg.svg";

export default function Record() {
    return (
        <div className="relative w-screen left-1/2 transform -translate-x-1/2 h-screen">
            <RecordSectionBackground />

            <Section
                displayName="Record"
                displayTitle={["서울과학기술대학교", "멋쟁이사자처럼이 걸어온 길"]}
                className="relative z-10 min-h-screen"
            >
                <div className="relative">
                    <MainPageBackground className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none z-0" />

                    <CardNumberRow />
                </div>
            </Section>
        </div>
    );
}
