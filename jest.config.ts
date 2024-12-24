import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node"
};

export default config;

// Reference
// https://jestjs.io/docs/configuration#automock-boolean
// https://kulshekhar.github.io/ts-jest/docs/
