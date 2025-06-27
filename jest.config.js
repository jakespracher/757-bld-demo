module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    extensionsToTreatAsEsm: ['.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!(node-fetch)/)',
    ],
}; 