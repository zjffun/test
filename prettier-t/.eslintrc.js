// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: { commonjs: true },
  extends: [
    "eslint:recommended",
    // prettier: this config only turns rules off
    "prettier",
  ],
  // https://eslint.org/docs/rules/
  rules: {
    "max-len": [1, 80],
  },
};
