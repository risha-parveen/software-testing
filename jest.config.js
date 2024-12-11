const config = {
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: [
        'src/toNumber.js',      
        'src/eq.js',  
        'src/get.js',  
        'src/map.js',  
        'src/isObject.js',  
        'src/isLength.js',  
        'src/reduce.js',  
        'src/filter.js',  
        'src/capitalize.js',  
        'src/isEmpty.js',
    ],
    transform: {
        '^.+\\.[tj]s$': 'babel-jest', // Transform JavaScript and TypeScript files
    },
};

export default config;
