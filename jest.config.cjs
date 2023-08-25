module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/test/**/*.test.[jt]s?(x)",
  ],
  collectCoverageFrom: ["src/**/*.ts"], // Adjust the path to your source files
};
