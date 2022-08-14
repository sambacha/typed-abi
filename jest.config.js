module.exports = {
  roots: ['src/'],
  clearMocks: true,
  collectCoverageFrom: ['**/*.ts?(x)', '!**/*.d.ts'],
  setupFilesAfterEnv: ['./__tests__/setupTests.ts'],
  snapshotResolver: './__tests__/snapshotResolver.js',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
