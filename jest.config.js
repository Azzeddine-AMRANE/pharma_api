module.exports = {
    preset: "@shelf/jest-mongodb",
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        },
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    
    testEnvironment: "node"
};
