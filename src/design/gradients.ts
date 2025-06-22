import { GradientPaint } from "@/lib/figmaToCss";

export const gradientDark: GradientPaint = {
    type: "GRADIENT_LINEAR",
    gradientTransform: [
        [1604, 621, 0],
        [-621, 1604, 0],
    ],
    gradientStops: [
        {
            position: 0.0,
            color: {
                // #873B01
                r: 0.5294117647058824,
                g: 0.23137254901960785,
                b: 0.00392156862745098,
                a: 0.65,
            },
        },
        {
            position: 1.0,
            color: {
                //#D65C00
                r: 0.8392156862745098,
                g: 0.3607843137254902,
                b: 0.0,
                a: 0.65,
            },
        },
    ],
};

export const gradientMedium: GradientPaint = {
    type: "GRADIENT_LINEAR",
    gradientTransform: [
        [1604, 621, 0],
        [-621, 1604, 0],
    ],
    gradientStops: [
        {
            position: 0.0,
            color: {
                // #F9EEE5
                r: 0.9764705882352941,
                g: 0.9333333333333333,
                b: 0.8980392156862745,
                a: 1,
            },
        },
        {
            position: 1.0,
            color: {
                //#FFC497
                r: 1.0,
                g: 0.7686274509803922,
                b: 0.592156862745098,
                a: 1,
            },
        },
    ],
};

export const gradientLight: GradientPaint = {
    type: "GRADIENT_LINEAR",
    gradientTransform: [
        [1604, 621, 0],
        [-621, 1604, 0],
    ],
    gradientStops: [
        {
            position: 0.0,
            color: {
                // #F9EEE5
                r: 0.9764705882352941,
                g: 0.9333333333333333,
                b: 0.8980392156862745,
                a: 1,
            },
        },
        {
            position: 1.0,
            color: {
                //#FFF3E5
                r: 1.0,
                g: 0.9529411764705882,
                b: 0.8980392156862745,
                a: 1,
            },
        },
    ],
};
