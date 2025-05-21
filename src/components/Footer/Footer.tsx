import TypeLogo from "../TypeLogo";
import ArrowUpRightIcon from "@/assets/arrow-up-right.svg";
import InstagramIcon from "@/assets/btn_instagram.svg";
import GithubIcon from "@/assets/btn_github.svg";

export default function Footer() {
    return (
        <footer className="w-screen flex items-center justify-center bg-gray-6 text-gray-1 h-[382px] py-[78px]">
            <div className="flex items-center justify-between w-full max-w-[1200px] h-full">
                <FooterLeft />

                <FooterRight />
            </div>
        </footer>
    );
}

function FooterLeft() {
    return (
        <div className="flex flex-col items-start justify-between h-full">
            <TypeLogo heightPx={28} />

            <p className="body5_r">
                서울과학기술대학교 멋쟁이사자처럼
                <br />ⓒ{new Date().getFullYear()} SEOULTECH LIKELION All rights reserved.
            </p>
        </div>
    );
}

function FooterRight() {
    return (
        <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-col items-start justify-start gap-3">
                <p className="body3_r">FAMILY SITE</p>
                <ul className="flex flex-col items-start justify-start gap-3">
                    {[
                        {
                            displayText: "멋쟁이사자처럼 대학",
                            url: "https://likelion.university/",
                        },
                        {
                            displayText: "멋쟁이사자처럼",
                            url: "https://likelion.net/",
                        },
                    ].map((item, index) => (
                        <FamilySite key={index} {...item} />
                    ))}
                </ul>
            </div>

            <FooterRightSocial />
        </div>
    );
}

function FamilySite({ displayText, url }: { displayText: string; url: string }) {
    return (
        <li>
            <a href={url} target="_blank" className="flex items-center justify-start gap-2">
                <span className="body5_r text-gray-1 hover:text-white hover:underline">
                    {displayText}
                </span>
                <ArrowUpRightIcon />
            </a>
        </li>
    );
}

function FooterRightSocial() {
    return (
        <ul className="flex items-center justify-start gap-3">
            {[
                {
                    accessibilityText: "Link to Instagram",
                    url: "https://www.instagram.com/likelion_st/",
                    icon: <InstagramIcon />,
                },
                {
                    accessibilityText: "Link to Github",
                    url: "https://github.com/LIKELION-SEOULTECH",
                    icon: <GithubIcon />,
                },
            ].map((item, index) => (
                <a key={index} href={item.url} aria-label={item.accessibilityText} target="_blank">
                    {item.icon}
                </a>
            ))}
        </ul>
    );
}
