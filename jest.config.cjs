module.exports = {
    preset: 'ts-jest',
    testMatch: ["**/?(*.)+(spec|test).[j]s"],
    testPathIgnorePatterns: ['/node_modules/', 'dist', '/build/'], //
    transform: {
        "^.+\\.ts?$": "ts-jest",
    }
}
