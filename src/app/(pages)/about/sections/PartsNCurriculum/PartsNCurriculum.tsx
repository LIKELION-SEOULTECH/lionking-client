"use client";

import { useState } from "react";
import type { Parts } from "@/types";
import Section from "@/components/ui/Section";
import PartSelector from "./components/PartSelector";
import Curriculum from "./components/Curriculum";
import Appear from "@/components/animations/Appear";

export default function PartsNCurriculum() {
    const [selectedPart, setSelectedPart] = useState<Parts>("기획");

    return (
        <Section
            displayName="Parts & Curriculum"
            displayTitle="5개의 파트로 운영되고 있어요"
            theme="LIGHT"
            className="py-[200px]"
        >
            <Appear>
                <div>
                    <PartSelector selectedPart={selectedPart} onChange={setSelectedPart} />

                    <div className="w-[1050px] mx-auto mt-10">
                        <Curriculum part={selectedPart} />
                    </div>
                </div>
            </Appear>
        </Section>
    );
}
