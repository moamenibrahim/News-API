module.exports = {
    preset: 'ts-jest',
    testMatch: ["**/?(*.)+(spec|test).[t]s"],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    }
}
