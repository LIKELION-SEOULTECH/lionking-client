import ProfilePanel from "./components/ProfilePanel";

export default function MemberPage() {
    return (
        <div className="flex items-center justify-center w-full py-[160px]">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 w-full">
                    <ProfilePanel
                        member={{
                            id: 1,
                            name: "라이옹",
                            major: "인공지능학과",
                            position: "프론트엔드",
                            role: "아기사자",
                            imageUrl: "/images/members/1.png",
                            userTags: ["프론트엔드", "아기사자"],
                            profileIntro: "안녕하시렵니까",
                            profileIntroTags: ["위엄", "라잌어", "라이옹"],
                            profileIntroSkills: ["잠자기", "공부하기"],
                            profileExternalLinks: [
                                { label: "GitHub", url: "https://github.com" },
                                { label: "Portfolio", url: "https://portfolio.com" },
                            ],
                        }}
                    />
                    <div className="flex flex-col gap-6 w-full">
                        PROJECTS_TAB
                        {/* <ProjectTabs /> */}
                        {/* <ProjectGrid /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
