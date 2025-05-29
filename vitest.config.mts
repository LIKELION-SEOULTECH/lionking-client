import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
    },
    resolve: {
        alias: {
            "@/assets/likelion_univ_orange.svg": "@/__mocks__/svgMock.ts",
            "@/assets/st.svg": "@/__mocks__/svgMock.ts",
            "@/assets/st_type_logo.svg": "@/__mocks__/svgMock.ts",
            "@/assets/profile_empty.svg": "@/__mocks__/svgMock.ts",
        },
    },
});
