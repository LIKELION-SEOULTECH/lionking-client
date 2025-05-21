import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/experimental-addon-test",
        "@storybook/addon-styling-webpack",
        "msw-storybook-addon",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    staticDirs: ["../public"],
    webpackFinal: async (config) => {
        // https://stackoverflow.com/questions/72710138/framer-motion-with-storybook-error-in-build-environment
        config.module?.rules?.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });

        // https://github.com/storybookjs/storybook/issues/18557#issuecomment-1426150038
        const imageRule = config.module?.rules?.find((rule) => {
            const test = (rule as { test: RegExp }).test;
            if (!test) {
                return false;
            }
            return test.test(".svg");
        }) as { [key: string]: any };
        imageRule.exclude = /\.svg$/;
        config.module?.rules?.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
export default config;
