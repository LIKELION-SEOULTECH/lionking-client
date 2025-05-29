import AboutBanner from "./sections/AboutBanner";
import AboutIntro from "./sections/AboutIntro";
import Calendar from "./sections/Calendar";
import MainActivities from "./sections/MainActivities";
import PartsNCurriculum from "./sections/PartsNCurriculum";
import Reviews from "./sections/Reviews";

export default function AboutPage() {
    return (
        <>
            <AboutBanner />

            <AboutIntro />

            <MainActivities />

            <PartsNCurriculum />

            <Calendar />

            <Reviews />
        </>
    );
}
