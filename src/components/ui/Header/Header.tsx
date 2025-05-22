import Navigation from "./Navigation/Navigation";
import Actions from "./Actions";
import TypeLogo from "../TypeLogo";

type HeaderProps = {
    isLoggedIn?: boolean;
};

export default function Header({ isLoggedIn = true }: HeaderProps) {
    return (
        <header
            className="w-screen fixed flex justify-center items-center h-[60px] bg-gray-8 z-[10000]"
            role="banner"
            aria-label="Header"
        >
            <div className="flex w-full items-center justify-between px-6 max-w-[1100px]">
                <TypeLogo />

                <div className="flex items-center gap-12.5">
                    <Navigation />
                    <Actions isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </header>
    );
}
