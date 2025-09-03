import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "istanbul",
            reporter: ["text", "lcov"],
            include: ["src/infrastructure/repositories/**/*.ts"],
        },
    },
    resolve: {
        alias: {
            "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
            "@application": path.resolve(__dirname, "./src/application"),
            "@domain": path.resolve(__dirname, "./src/domain"),
        },
    },
});
