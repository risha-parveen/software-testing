const config = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    transform: {
        '^.+\\.[tj]s$': 'babel-jest', // Transform JavaScript and TypeScript files
    },
};

export default config;
