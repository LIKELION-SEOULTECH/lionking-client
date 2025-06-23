import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ProjectDetailProps = {
    projectName: string;
};

export default function ProjectDetailMeta({ projectName }: ProjectDetailProps) {
    return (
        <div className="w-full flex flex-col items-start justify-start gap-10">
            <div className="w-full flex flex-col items-start justify-start gap-8">
                <h1 className="head3_sb text-white">{projectName}</h1>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-start gap-3">
                        <ProjectDetailPageTagItem tag="12기" />
                        <ProjectDetailPageTagItem tag="아이디어톤" />
                    </div>
                    <Link
                        className="flex items-center justify-center gap-1 px-4.5 py-2.5 bg-gray-7 rounded-full text-white sub3_sb hover:bg-gray-6 transition-colors duration-200"
                        target="_blank"
                        href="https://youtube.com/"
                    >
                        <p>시연 영상 보러가기</p>
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </div>

            <div className="relative flex items-center justify-center overflow-hidden w-full aspect-video">
                <Image src="/static/images/placeholder_thumbnail.png" alt={projectName} fill />
            </div>

            <div className="w-full flex items-center justify-center px-12.75 py-10 border border-gray-5 rounded-[20px]">
                <div className="w-full flex flex-col gap-10 items-start justify-center">
                    <div className="w-full flex items-center justify-start gap-22.5">
                        <p className="sub2_sb text-white">팀원</p>

                        <ul className="flex flex-wrap gap-x-1.5 after:content-none body3_r text-gray-1">
                            {[
                                "유가은",
                                "이민지",
                                "김수빈",
                                "김리사",
                                "임도협",
                                "최강",
                                "권현욱",
                                "조건희",
                                "김민서",
                            ].map((name) => (
                                <li
                                    key={name}
                                    className="after:content-[','] last:after:content-none"
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="body3_r text-white break-keep">
                        맛있는 커피를 더 쉽게 찾아 마실 순 없을까요?
                        <br />
                        브루라운지는 카페의 공간, 거리, 가격 보다는 커피의 맛에 집중해 카페를
                        큐레이팅하는 서비스입니다.
                        <br />
                         주요 원두부터 산지, 향미, 시그니처 메뉴를 한눈에 파악하고, 선정 기준을 통해
                        카페에 어떤 스토리가 있는지 확인할 수 있어요. 
                    </p>
                </div>
            </div>
        </div>
    );
}

function ProjectDetailPageTagItem({ tag }: { tag: string }) {
    return (
        <div className="flex items-center justify-center px-3.5 py-2 bg-gray-5 rounded-full">
            <p className="body4_m text-white">{tag}</p>
        </div>
    );
}
