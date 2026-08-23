import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    {
        ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: { ...globals.node } },
        rules: {
            eqeqeq: ["error", "always"],
            "no-implicit-coercion": "error",
            "no-console": "off",
            "prefer-const": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-template": "error",
            "no-duplicate-imports": "error",
            "no-return-assign": "error",
            "no-else-return": "error",
            "no-useless-return": "error",
            "no-throw-literal": "error",
            "no-debugger": "error",
        },
    },
    {
        files: ["**/*.{ts,mts,cts}"],
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                },
            ],
            "@typescript-eslint/no-inferrable-types": "error",
        },
    },
    tseslint.configs.recommended,
    eslintConfigPrettier,
]);
