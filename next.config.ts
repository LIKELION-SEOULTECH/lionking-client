import type { NextConfig } from "next";
import test from "node:test";

const nextConfig: NextConfig = {
    eslint: {
        dirs: ["src"],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    redirects: async () => [
        {
            source: "/home",
            destination: "/",
            permanent: true,
        },
        {
            source: "/archive",
            destination: "/archive/projects",
            permanent: true,
        },
    ],
    rewrites: async () => [
        {
            source: "/",
            destination: "/home",
        },
    ],
};

export default nextConfig;
