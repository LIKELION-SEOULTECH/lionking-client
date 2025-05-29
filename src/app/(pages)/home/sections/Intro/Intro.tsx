import LightEffect from "./components/LightEffect";
import HeroText from "./components/HeroText";

export default function Intro() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <HeroText />

            <LightEffect />
        </div>
    );
}
