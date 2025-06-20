import { motion } from "motion/react";

type HamburgerButtonProps = {
    isOpen: boolean;
    onClick: (e: React.MouseEvent) => void;
};

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            className="relative w-6 h-6 flex flex-col justify-center items-center rounded p-1 cursor-pointer"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
        >
            <motion.span
                className="absolute h-0.5 w-5 bg-gray-1 rounded-full"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -6,
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="absolute h-0.5 w-5 bg-gray-1 rounded-full"
                animate={{
                    opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="absolute h-0.5 w-5 bg-gray-1 rounded-full"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 6,
                }}
                transition={{ duration: 0.2 }}
            />
        </button>
    );
}
