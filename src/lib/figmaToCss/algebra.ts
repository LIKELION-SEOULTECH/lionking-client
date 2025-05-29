export function inverseMatrix(m: number[][]): [[number, number, number], [number, number, number]] {
    const [a, b, c] = m[0],
        [d, e, f] = m[1];
    const det = a * e - b * d;
    return [
        [e / det, -b / det, (b * f - c * e) / det],
        [-d / det, a / det, (c * d - a * f) / det],
    ];
}

export function applyMatrixToPoint(
    m: [[number, number, number], [number, number, number]],
    [x, y]: [number, number]
): { x: number; y: number } {
    return {
        x: m[0][0] * x + m[0][1] * y + m[0][2],
        y: m[1][0] * x + m[1][1] * y + m[1][2],
    };
}

export function calcEndpoints(
    transform: [[number, number, number], [number, number, number]],
    width: number,
    height: number
) {
    const inv = inverseMatrix(transform);
    const p_0 = applyMatrixToPoint(inv, [0, 0.5]);
    const p_1 = applyMatrixToPoint(inv, [1, 0.5]);
    return {
        start: { x: p_0.x * width, y: p_0.y * height },
        end: { x: p_1.x * width, y: p_1.y * height },
    };
}

export function calcAngle(start: { x: number; y: number }, end: { x: number; y: number }) {
    let theta = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
    theta = (theta - 90 + 360) % 360;
    return (theta - 180 + 360) % 360;
}

export function gradientLength(width: number, height: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));
}

export function projectOnLine(
    pt: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number }
) {
    const vx = b.x - a.x,
        vy = b.y - a.y;
    const wx = pt.x - a.x,
        wy = pt.y - a.y;
    const t = (vx * wx + vy * wy) / (vx * vx + vy * vy);
    return { x: a.x + vx * t, y: a.y + vy * t };
}

export function rgbaToHex(c: { r: number; g: number; b: number; a: number }) {
    const to2 = (n: number) => ("0" + Math.round(n * 255).toString(16)).slice(-2);
    const hex = `#${to2(c.r)}${to2(c.g)}${to2(c.b)}`;
    return c.a < 1 ? hex + to2(c.a) : hex;
}
