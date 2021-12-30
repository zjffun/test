module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "no-else/no-else": 2,
  },
  plugins: ["no-else"],
};
