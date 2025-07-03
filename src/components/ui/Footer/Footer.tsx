import TypeLogo from "../TypeLogo";
import ArrowUpRightIcon from "@/assets/arrow-up-right.svg";
import InstagramIcon from "@/assets/btn_instagram.svg";
import GithubIcon from "@/assets/btn_github.svg";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="w-full bg-gray-6 text-gray-1 h-[382px] py-19.5">
            <div className="mx-auto flex h-full max-w-[1100px] flex-col items-center px-6 lg:flex-row lg:justify-between lg:items-start">
                <div className="flex h-full w-full flex-col items-center justify-between lg:items-start">
                    <div>
                        <TypeLogo className="h-4 lg:h-6" />
                    </div>

                    <div className="lg:hidden w-full">
                        <FooterRight />
                    </div>

                    <p className="body6_r text-center lg:text-left">
                        서울과학기술대학교 멋쟁이사자처럼
                        <br />ⓒ{year} SEOULTECH LIKELION All rights reserved.
                    </p>
                </div>

                <div className="w-full h-full hidden lg:flex items-end justify-end">
                    <FooterRight />
                </div>
            </div>
        </footer>
    );
}

function FooterRight() {
    return (
        <div className="h-full flex flex-col items-center lg:items-start justify-center lg:justify-between gap-2 lg:gap-8">
            <div className="flex flex-col items-center lg:items-start gap-3">
                <p className="body3_r hidden lg:block">FAMILY SITE</p>
                <ul className="flex flex-col items-center lg:items-start gap-3">
                    {[
                        { displayText: "멋쟁이사자처럼 대학", url: "https://likelion.university/" },
                        { displayText: "멋쟁이사자처럼", url: "https://likelion.net/" },
                    ].map((item, idx) => (
                        <li
                            key={idx}
                            className="w-full flex items-center justify-center lg:justify-start"
                        >
                            <a
                                href={item.url}
                                target="_blank"
                                className="flex items-center gap-0 lg:gap-2"
                            >
                                <span className="body5_r text-gray-1 hover:text-white hover:underline">
                                    {item.displayText}
                                </span>
                                <ArrowUpRightIcon className="scale-[0.75] lg:scale-[1]" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="flex items-center gap-0 lg:gap-4">
                <li>
                    <a
                        href="https://www.instagram.com/likelion_st/"
                        target="_blank"
                        aria-label="Link to Instagram"
                    >
                        <InstagramIcon className="scale-[0.75] lg:scale-[1]" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/LIKELION-SEOULTECH"
                        target="_blank"
                        aria-label="Link to Github"
                    >
                        <GithubIcon className="scale-[0.75] lg:scale-[1]" />
                    </a>
                </li>
            </ul>
        </div>
    );
}
