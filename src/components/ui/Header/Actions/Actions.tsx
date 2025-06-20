import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProfileButton from "./components/ProfileButton";

type ActionsProps = {
    isLoggedIn: boolean;
    isMobile?: boolean;
};

export default function Actions({ isLoggedIn, isMobile = false }: ActionsProps) {
    return (
        <div
            className={cn("h-full flex items-center gap-4", isMobile && "gap-2")}
            role="group"
            aria-label="동아리 지원 및 로그인 버튼"
        >
            <Button color="orange" type="button" className={cn(isMobile && "text-sm px-3 py-1.5")}>
                {isMobile ? "지원" : "지원하기"}
            </Button>

            <div className={cn(isMobile && "hidden sm:block")}>
                {isLoggedIn ? (
                    <ProfileButton isMobile={isMobile} />
                ) : (
                    <LoginButton isMobile={isMobile} />
                )}
            </div>
        </div>
    );
}

function LoginButton({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <Button color="neutral" type="button" className={cn(isMobile && "text-sm px-3 py-1.5")}>
            로그인
        </Button>
    );
}
