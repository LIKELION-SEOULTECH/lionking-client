import LionOrange from "@/assets/st_type_logo.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TypeLogoProps = {
    heightPx?: number;
    className?: string;
};

export default function TypeLogo({ heightPx, className = "" }: TypeLogoProps) {
    const clampStyle = heightPx ? { height: `clamp(18px, 6vw, ${heightPx}px)` } : undefined;

    return (
        <Link
            href="/"
            aria-label="서울과학기술대학교 멋쟁이사자처럼 홈페이지"
            className={cn(
                "inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main",
                className
            )}
        >
            <LionOrange style={clampStyle} className="w-auto h-full block max-w-full" />
        </Link>
    );
}
