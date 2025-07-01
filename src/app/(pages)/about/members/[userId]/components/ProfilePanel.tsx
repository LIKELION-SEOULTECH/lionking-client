import { Member } from "@/types";
import ProfileCard from "@/components/ui/ProfileCard";
import ArrowUpGrayIcon from "@/assets/icons/ic_arrow_up_right_gray.svg";

type ProfilePanelProps = {
    member: Member;
};
export default function ProfilePanel({ member }: ProfilePanelProps) {
    const { profileIntro, profileIntroTags, profileIntroSkills, profileExternalLinks } = member;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] lg:grid-cols-1 gap-4 lg:gap-6 w-full lg:max-w-[350px]">
            <ProfileCard member={member} size="large" transparency="transparent" />

            <div className="grid grid-cols-1 gap-4 lg:gap-6 w-full">
                <ProfilePanelSection>
                    <ProfilePanelSubSection title="소개">
                        <div className="w-full flex flex-col items-start justify-center gap-5">
                            <div className="flex flex-wrap gap-2">
                                {profileIntroTags &&
                                    profileIntroTags.map((tag) => (
                                        <ProfileTagItem key={tag} tag={tag} />
                                    ))}
                            </div>
                            <p>{profileIntro ?? "비밀이에요 🤫"}</p>
                        </div>
                    </ProfilePanelSubSection>
                    {profileIntroSkills && profileIntroSkills.length > 0 && (
                        <ProfilePanelSubSection title="기술">
                            <p>{profileIntroSkills}</p>
                        </ProfilePanelSubSection>
                    )}
                </ProfilePanelSection>

                {profileExternalLinks && profileExternalLinks.length > 0 && (
                    <ProfilePanelSection>
                        <ProfilePanelSubSection title="LINKS">
                            <div className="w-full flex flex-col items-start justify-center gap-2">
                                {profileExternalLinks.map((link, idx) => (
                                    <div
                                        className="w-full flex flex-col items-start justify-center gap-2"
                                        key={link.type}
                                    >
                                        <ProfileExternalLinkItem {...link} />

                                        {idx < profileExternalLinks.length - 1 && (
                                            <div className="w-full h-[0.5px] bg-gray-5 " />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ProfilePanelSubSection>
                    </ProfilePanelSection>
                )}
            </div>
        </div>
    );
}

function ProfilePanelSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-start justify-start p-6.5 gap-8 rounded-[8px] lg:rounded-[20px] border border-gray-5">
            {children}
        </div>
    );
}

function ProfilePanelSubSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-4 text-white">
            <p className="sub2_sb">{title}</p>
            <div className="w-full flex flex-col items-start justify-center body5_r">
                {children}
            </div>
        </div>
    );
}

function ProfileTagItem({ tag }: { tag: string }) {
    return (
        <div className="flex items-center justify-center p-2 rounded-[4px] bg-gray-5 hover:bg-gray-5/80 transition-colors duration-200 cursor-default text-gray-1 caption8_m">
            <p>{`#${tag}`}</p>
        </div>
    );
}

function ProfileExternalLinkItem({ type, url }: { type: string; url: string }) {
    return (
        <a
            href={url}
            className="w-full flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer"
        >
            <p className="body5_r text-white hover:underline">{type}</p>
            <ArrowUpGrayIcon />
        </a>
    );
}
