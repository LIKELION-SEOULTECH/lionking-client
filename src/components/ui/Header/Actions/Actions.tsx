import Link from "next/link";
import Button from "@/components/ui/Button";
import ProfileButton from "./components/ProfileButton";
import { Member } from "@/types";

type ActionsProps = {
    isLoggedIn: boolean;
    authenticatedUser: Member | undefined;
};

export default function Actions({ isLoggedIn, authenticatedUser }: ActionsProps) {
    return (
        <div
            className="h-full flex items-center gap-4"
            role="group"
            aria-label="동아리 지원 및 로그인 버튼"
        >
            <Link href="/apply" className="block">
                <Button color="orange" type="button">
                    지원하기
                </Button>
            </Link>

            <div className="hidden sm:block">
                {isLoggedIn ? (
                    <ProfileButton authenticatedUser={authenticatedUser} />
                ) : (
                    <Link href="/login" className="block">
                        <Button color="neutral" type="button">
                            로그인
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
