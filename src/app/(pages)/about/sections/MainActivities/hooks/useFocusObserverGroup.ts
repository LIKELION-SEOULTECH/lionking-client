import { useEffect, useRef, useState } from "react";

export function useFocusObserverGroup(cardCount: number) {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let maxIndex = 0;

                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute("data-index"));
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        maxIndex = index;
                    }
                });

                setFocusedIndex(maxIndex);
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100),
            }
        );

        refs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [cardCount]);

    return {
        focusedIndex,
        setRef: (el: HTMLDivElement | null, index: number) => {
            refs.current[index] = el;
        },
    };
}
