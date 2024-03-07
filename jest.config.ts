import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>"],

  moduleNameMapper: pathsToModuleNameMapper({
    "@/*": ["<rootDir>/src/$1"],
    "@app/*": ["<rootDir>/src/app/$1"],
    "@auth/*": ["<rootDir>/src/auth/$1"],
    "@file/*": ["<rootDir>/src/file/$1"],
    "@source/*": ["<rootDir>/src/source/$1"],
  })
}

export default jestConfig;
