import { Parts } from "@/types";

type PartData = {
    roleDescription: string;
    curriculum: string[];
};

export const partCurriculumData: Record<Parts, PartData> = {
    기획: {
        roleDescription:
            "서비스의 아이디어를 구체화 하고, 어떤 기능이 필요한지 고민하며 팀원들과 협업해 프로젝트를 이끌어가는 역할을 해요.",
        curriculum: ["기획 전반 과정", "IA / 와이어 프레임", "아이디어톤 전반", "장기 프로젝트"],
    },
    디자인: {
        roleDescription:
            "프로젝트에서 사용자들이 편리하게 이용할 수 있도록 UX/UI 디자인을 만들고, 서비스의 아이덴티티를 구축하는 역할을 해요.",
        curriculum: [
            "피그마 심화 기능 하루만에 끝내기",
            "사이드 특성에 맞는 페이지 컨셉 디자인",
            "효율적인 디자인 시스템 구축하기",
            "구체적인 UI 개발",
        ],
    },
    프론트엔드: {
        roleDescription:
            "서비스의 아이디어를 구체화 하고, 어떤 기능이 필요한지 고민하며 팀원들과 협업해 프로젝트를 이끌어가는 역할을 해요.",
        curriculum: [
            "개발 통합 세션",
            "React Hook",
            "웹에서 앱으로 : React 생태계로 만드는 하이브리드 앱",
        ],
    },
    백엔드: {
        roleDescription: "서비스의 데이터 흐름을 관리하고, 서버 로직과 DB 설계를 맡아요.",
        curriculum: ["개발 통합 세션", "Kafka Messaging Queue", "쿠버네티스 구축과 배포"],
    },
    AI: {
        roleDescription:
            "데이터 분석과 모델링을 통해 AI 기능을 구현하고, 서비스에 접목하는 역할을 해요.",
        curriculum: [
            "개발 통합 세션",
            "YOLO를 사용한 Object Detection 구현하기",
            "감정분석 모델 제작",
        ],
    },
};
