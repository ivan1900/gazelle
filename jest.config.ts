import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/src';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*test.ts`, `${baseTestDir}/**/*test.ts`],
  moduleNameMapper: {
    '^@/generated/prisma/client$': '<rootDir>/src/__mocks__/prismaClient.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
};

export default config;
