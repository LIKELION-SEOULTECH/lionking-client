"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import PartSelector, { Parts } from "./components/PartSelector";

export default function PartsNCurriculum() {
    const [selectedPart, setSelectedPart] = useState<Parts>("기획");

    return (
        <Section
            displayName="Parts & Curriculum"
            displayTitle="5개의 파트로 운영되고 있어요"
            theme="LIGHT"
            className="py-[200px]"
        >
            <div>
                <PartSelector selectedPart={selectedPart} onChange={setSelectedPart} />

                <div className="text-center text-xl font-semibold">
                    현재 선택된 파트: {selectedPart}
                </div>
            </div>
        </Section>
    );
}
