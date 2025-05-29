import { calcAngle, calcEndpoints, gradientLength, projectOnLine, rgbaToHex } from "./algebra";

import type { ColorStop } from "./types";

export function figmaLinearGradientToCSS(
    transform: [[number, number, number], [number, number, number]],
    stops: ColorStop[],
    width: number,
    height: number
): string {
    const { start, end } = calcEndpoints(transform, width, height);
    const angle = calcAngle(start, end);
    const halfLen = gradientLength(width, height, angle) / 2;
    const cx = width / 2,
        cy = height / 2;
    const θ = ((angle - 90) * Math.PI) / 180;
    const cssStart = { x: cx - halfLen * Math.cos(θ), y: cy - halfLen * Math.sin(θ) };
    const cssEnd = { x: cx + halfLen * Math.cos(θ), y: cy + halfLen * Math.sin(θ) };

    const cssStops = stops.map((s) => {
        const pos = {
            x: start.x + (end.x - start.x) * s.position,
            y: start.y + (end.y - start.y) * s.position,
        };
        const proj = projectOnLine(pos, cssStart, cssEnd);
        const dist = Math.hypot(proj.x - cssStart.x, proj.y - cssStart.y);
        const total = Math.hypot(cssEnd.x - cssStart.x, cssEnd.y - cssStart.y);
        return `${rgbaToHex(s.color)} ${((dist / total) * 100).toFixed(2)}%`;
    });

    return `linear-gradient(${angle}deg, ${cssStops.join(", ")})`;
}
