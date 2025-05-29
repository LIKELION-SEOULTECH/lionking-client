import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function useHoverAnimation<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.style.transformStyle = "preserve-3d";
        el.style.perspective = "1200px";

        const update = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            const rotateX = (-y / rect.height) * 6;
            const rotateY = (x / rect.width) * 6;

            gsap.to(el, {
                x: x * 0.08,
                y: y * 0.08,
                rotateX,
                rotateY,
                ease: "power1.out",
                duration: 0.2,
                overwrite: "auto",
            });
        };

        const handleMouseEnter = (e: MouseEvent) => {
            setIsHovered(true);
            update(e);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            gsap.to(el, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                ease: "power1.out",
                duration: 0.3,
                overwrite: "auto",
            });
        };

        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mousemove", update);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mousemove", update);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return { ref, isHovered };
}
