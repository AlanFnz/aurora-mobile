module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/tests-setup.ts'],
  transformIgnorePatterns: [],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
