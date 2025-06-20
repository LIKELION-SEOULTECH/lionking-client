import LionOrange from "@/assets/st_type_logo.svg";
import Link from "next/link";

type TypeLogoProps = {
    heightPx?: number;
    className?: string;
};

export default function TypeLogo({ heightPx = 20, className }: TypeLogoProps) {
    return (
        <Link
            href="/"
            aria-label="서울과학기술대학교 멋쟁이사자처럼 홈페이지"
            className={`inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main ${className}`}
        >
            <div style={{ height: `${heightPx}px`, maxWidth: "100%", display: "hidden" }}>
                <LionOrange
                    style={{ height: "100%", width: "auto", maxWidth: "100%", display: "block" }}
                />
            </div>
        </Link>
    );
}
