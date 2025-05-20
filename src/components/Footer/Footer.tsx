import ArrowUpRightIcon from "@/assets/arrow-up-right.svg";
import InstagramIcon from "@/assets/btn_instagram.svg";
import GithubIcon from "@/assets/btn_github.svg";

export default function Footer() {
    return (
        <footer className="bg-stone-800 text-neutral-100">
            <div className="max-w-screen-xl px-6 py-20 mx-auto sm:px-8 lg:px-28">
                <div className="flex flex-col justify-between gap-16 md:flex-row">
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-xl font-medium leading-loose">
                            서울과학기술대학교 멋쟁이사자처럼
                        </h2>
                        <p className="text-base">ⓒ2025 SEOULTECH LIKELION All rights reserved.</p>
                    </div>

                    <div className="flex flex-col space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium leading-loose">FAMILY SITE</h3>
                            <ul className="space-y-1">
                                {[
                                    { name: "멋쟁이사자처럼 대학", href: "#" },
                                    { name: "멋쟁이사자처럼", href: "#" },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-2 transition-colors hover:text-orange-500"
                                        >
                                            <span>{link.name}</span>
                                            <ArrowUpRightIcon />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="flex items-center justify-center transition-colors rounded-full w-14 h-14 bg-neutral-900 hover:bg-neutral-700"
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center transition-colors rounded-full w-14 h-14 bg-neutral-900 hover:bg-neutral-700"
                            >
                                <GithubIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
