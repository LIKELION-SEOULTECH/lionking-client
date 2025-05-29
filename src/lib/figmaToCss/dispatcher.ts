import type { GradientPaint } from "./types";
import { figmaLinearGradientToCSS } from "./linear";
import { figmaRadialGradientToCSS } from "./radial";

export function figmaPaintToCSS(paint: GradientPaint, width: number, height: number): string {
    if (paint.type === "GRADIENT_LINEAR") {
        return figmaLinearGradientToCSS(
            paint.gradientTransform,
            paint.gradientStops,
            width,
            height
        );
    } else {
        return figmaRadialGradientToCSS(
            paint.gradientTransform,
            paint.gradientStops,
            width,
            height
        );
    }
}
