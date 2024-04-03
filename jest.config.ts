const config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};

export default config;
