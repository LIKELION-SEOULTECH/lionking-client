import Button from "@/components/ui/Button";
import ProfileButton from "./components/ProfileButton";

type ActionsProps = {
    isLoggedIn: boolean;
};

export default function Actions({ isLoggedIn }: ActionsProps) {
    return (
        <div
            className="h-full flex items-center gap-4"
            role="group"
            aria-label="동아리 지원 및 로그인 버튼"
        >
            <Button color="orange" type="button">
                지원하기
            </Button>
            {isLoggedIn ? <ProfileButton /> : <LoginButton />}
        </div>
    );
}

function LoginButton() {
    return (
        <Button color="neutral" type="button">
            로그인
        </Button>
    );
}
