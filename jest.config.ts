import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server';
const baseTestDir = '<rootDir>/src/app/server';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*test.ts`, `${baseTestDir}/**/*test.ts`],
};

export default config;
