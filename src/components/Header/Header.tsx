import Navigation from "./Navigation/Navigation";
import Actions from "./Actions";
import TypeLogo from "../TypeLogo";

type HeaderProps = {
    isLoggedIn?: boolean;
};

export default function Header({ isLoggedIn = false }: HeaderProps) {
    return (
        <header
            className="w-screen flex justify-center items-center"
            role="banner"
            aria-label="Header"
        >
            <div className="flex w-full items-center justify-between  py-3 px-6 max-w-[1100px]">
                <TypeLogo />

                <div className="flex items-center gap-12.5">
                    <Navigation />
                    <Actions isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </header>
    );
}
