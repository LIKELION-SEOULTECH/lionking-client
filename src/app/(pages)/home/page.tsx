import Intro from "./sections/Intro";
import Record from "./sections/Record";
import Activities from "./sections/Activities";
import Projects from "./sections/Projects";
import MainPageBackground from "@/assets/main_bg.svg";

export default function Home() {
    return (
        <>
            <Intro />

            <div className="relative w-full">
                <Record />

                <Activities />

                <Projects />

                <MainPageBackground
                    className="absolute top-10 left-0 w-full h-full pointer-events-none select-none -z-10"
                    preserveAspectRatio="xMidYMin slice"
                />
            </div>
        </>
    );
}
