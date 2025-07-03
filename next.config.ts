import type { NextConfig } from "next";
import test from "node:test";

const nextConfig: NextConfig = {
    eslint: {
        dirs: ["src"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lionking-bucket2.s3.ap-northeast-2.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
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
        {
            source: "/api/mixed/:path*",
            destination: "http://15.164.107.219:8080/api/v1/:path*",
        },
    ],
};

export default nextConfig;
