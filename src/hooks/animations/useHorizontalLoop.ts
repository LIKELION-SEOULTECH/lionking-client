import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useMotionValue, MotionValue } from "motion/react";

interface LoopOptions {
    speed?: number;
    width: number;
}

interface HorizontalLoopReturn {
    x: MotionValue<number>;
    paused: boolean;
    setPaused: Dispatch<SetStateAction<boolean>>;
}

export function useHorizontalLoop({ speed = 100, width }: LoopOptions): HorizontalLoopReturn {
    const x = useMotionValue(0);
    const [paused, setPaused] = useState<boolean>(false);

    const frameRef = useRef<number | null>(null);
    const lastRef = useRef<number>(performance.now());

    useEffect(() => {
        function step(now: number) {
            const dt = now - lastRef.current;
            lastRef.current = now;

            if (!paused && width > 0) {
                const prev = x.get();
                let next = prev - (speed * dt) / 1000;
                if (next <= -width) next += width;
                if (next > 0) next -= width;
                x.set(next);
            }

            frameRef.current = requestAnimationFrame(step);
        }

        frameRef.current = requestAnimationFrame(step);
        return () => {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [paused, speed, width, x]);

    return { x, paused, setPaused };
}
