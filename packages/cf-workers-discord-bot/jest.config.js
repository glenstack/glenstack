module.exports = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["../node_modules/cross-fetch/polyfill"],
};
