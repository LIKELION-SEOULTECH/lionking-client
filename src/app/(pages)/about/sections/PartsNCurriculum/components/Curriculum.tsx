import type { Parts } from "@/types";
import { partCurriculumData } from "@/contents/partCurriculumData";

export default function Curriculum({ part }: { part: Parts }) {
    const { roleDescription, curriculum } = partCurriculumData[part];

    return (
        <div className="w-full flex flex-col items-center justify-center mx-auto gap-10">
            <PartRoles roleDescription={roleDescription} />

            <div className="w-full flex flex-col gap-5 items-center justify-center">
                {curriculum.map((item, i) => (
                    <CurriculumItem key={i} text={item} index={i + 1} />
                ))}
            </div>
        </div>
    );
}

function PartRoles({ roleDescription }: { roleDescription: string }) {
    return (
        <div className="w-full flex flex-col items-center justify-center max-w-[1058px] mx-auto">
            <div className="w-full flex flex-col gap-[18px] px-20 py-[30px]">
                <p className="sub1_sb text-orange-main">파트 역할</p>
                <p className="body2_sb text-gray-7">{roleDescription}</p>
            </div>
        </div>
    );
}

function CurriculumItem({ text, index }: { text: string; index: number }) {
    return (
        <div className="w-full flex items-center justify-start px-8 py-6 gap-[46px] sub1_sb text-gray-5">
            <span>{index}</span>
            <span>{text}</span>
        </div>
    );
}
