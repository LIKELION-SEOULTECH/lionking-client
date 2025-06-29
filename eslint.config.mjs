import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", "prettier"],
        rules: {
            indent: ["off", 4, { SwitchCase: 1 }],
            "no-console": "off",
            "no-unused-vars": [
                "off",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "import/no-anonymous-default-export": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@next/next/no-img-element": "off",
        },
        overrides: [
            {
                files: ["**/*.test.tsx"],
                rules: {
                    "@typescript-eslint/no-explicit-any": "off",
                    "@typescript-eslint/no-unused-vars": "off",
                },
            },
        ],
    }),
];

export default eslintConfig;
