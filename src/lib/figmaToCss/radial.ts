import { applyMatrixToPoint, inverseMatrix, rgbaToHex } from "./algebra";
import type { ColorStop } from "./types";

export function figmaRadialGradientToCSS(
    transform: [[number, number, number], [number, number, number]],
    stops: ColorStop[],
    width: number,
    height: number
): string {
    const inv = inverseMatrix(transform);

    const { x: cxN, y: cyN } = applyMatrixToPoint(inv, [0.5, 0.5]);
    const cx = cxN * width,
        cy = cyN * height;

    const { x: rxN, y: ryN } = applyMatrixToPoint(inv, [1, 0.5]);
    const rx = Math.hypot((rxN - cxN) * width, (ryN - cyN) * height);

    const { x: rx2N, y: ry2N } = applyMatrixToPoint(inv, [0.5, 1]);
    const ry = Math.hypot((rx2N - cxN) * width, (ry2N - cyN) * height);

    const stopsCSS = stops
        .map((s) => `${rgbaToHex(s.color)} ${(s.position * 100).toFixed(2)}%`)
        .join(", ");

    return `radial-gradient(ellipse ${rx.toFixed(2)}px ${ry.toFixed(2)}px at ${cx.toFixed(
        2
    )}px ${cy.toFixed(2)}px, ${stopsCSS})`;
}
