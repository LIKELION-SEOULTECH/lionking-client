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
            className="py-50 overflow-hidden"
        >
            <Appear>
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PartSelector selectedPart={selectedPart} onChange={setSelectedPart} />

                    <div className="mt-10">
                        <Curriculum part={selectedPart} />
                    </div>
                </div>
            </Appear>
        </Section>
    );
}
