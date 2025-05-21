import LionOrange from "@/assets/st_type_logo.svg";
import Link from "next/link";

type TypeLogoProps = {
    heightPx?: number;
};

export default function TypeLogo({ heightPx = 20 }: TypeLogoProps) {
    return (
        <Link
            href="/"
            aria-label="서울과학기술대학교 멋쟁이사자처럼 홈페이지"
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
        >
            <div style={{ height: `${heightPx}px`, width: "auto", display: "inline-block" }}>
                <LionOrange style={{ height: "100%", width: "auto", display: "block" }} />
            </div>
        </Link>
    );
}
