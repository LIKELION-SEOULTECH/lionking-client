import Hero from "./sections/Hero/Hero";
import Schedule from "./sections/Schedule ";
import Eligibility from "./sections/Eligibility";
import Fields from "./sections/Fields";
import Notify from "./sections/Notify/Notify";
import FAQ from "./sections/FAQ";

export default function ApplyPage() {
    return (
        <>
            <Hero />
            <Schedule />
            <Eligibility />
            <Fields />
            <Notify />
            <FAQ />
        </>
    );
}
