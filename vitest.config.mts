import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), react(), vitePluginMockSvg()],
    test: {
        environment: "jsdom",
        setupFiles: "./vitest.setup.tsx",
        globals: true,
    },
});

export function vitePluginMockSvg() {
    return {
        name: "vite-plugin-mock-svg",
        enforce: "pre" as const,
        resolveId(source: string) {
            if (source.endsWith(".svg")) return source;
            return null;
        },
        load(id: string) {
            if (id.endsWith(".svg")) {
                return `
                    import React from 'react';
                    export default function SvgMock(props) {
                        return React.createElement('svg', { 'data-testid': 'svg-mock', ...props });
                    }
                `;
            }
            return null;
        },
    };
}
