import Button from "@/components/ui/Button";
import ProfileEmpty from "@/assets/profile_empty.svg";

type ActionsProps = {
    isLoggedIn: boolean;
};

export default function Actions({ isLoggedIn }: ActionsProps) {
    return (
        <div className="flex gap-4" role="group" aria-label="동아리 지원 및 로그인 버튼">
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

function ProfileButton() {
    return (
        <div className="flex justify-start items-center gap-2">
            <ProfileEmpty />

            <div className="subtitle-5">김사자</div>
        </div>
    );
}
