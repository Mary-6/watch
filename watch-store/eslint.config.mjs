import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Prisma payloads and dynamic form data use broad types during initial build.
      // These can be tightened to explicit Prisma DTOs as the project evolves.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
