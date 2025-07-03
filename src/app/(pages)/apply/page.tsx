import Hero from "./sections/Hero/Hero";
import Schedule from "./sections/Schedule ";
import Eligibility from "./sections/Eligibility";
import Fields from "./sections/Fields";
import FAQ from "./sections/FAQ";
import { ApplicationLetterButton } from "@/components/ui/ApplicationLetterButton";

export default function ApplyPage() {
    return (
        <>
            <Hero />
            <Schedule />
            <Eligibility />
            <Fields />
            <div className="flex justify-center mt-20 w-full">
                <ApplicationLetterButton />
            </div>
            <FAQ />
        </>
    );
}
