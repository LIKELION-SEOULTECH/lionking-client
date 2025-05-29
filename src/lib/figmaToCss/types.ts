export type ColorStop = {
    position: number;
    color: { r: number; g: number; b: number; a: number };
};

export type PaintType = "GRADIENT_LINEAR" | "GRADIENT_RADIAL";

export type GradientPaint = {
    type: PaintType;
    gradientTransform: [[number, number, number], [number, number, number]];
    gradientStops: ColorStop[];
};
