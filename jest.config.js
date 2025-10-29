module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup-globals.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native/Libraries/BatchedBridge/NativeModules$': '<rootDir>/jest/mocks/NativeModules.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-clone-referenced-element|@react-navigation|@react-native-async-storage|expo-linear-gradient|expo-constants|@react-native-community|@expo|expo-status-bar)/)',
  ],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts?(x)'],
};
