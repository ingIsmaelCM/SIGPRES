module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/{!(config),}.ts",
    "!src/AppInit.ts",
    "!src/**/Requests.ts",
  ],
};
