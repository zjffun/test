const esmRequire = require("esm")(module, {
  mainFields: ["exports"],
  force: true,
});

// Error [ERR_REQUIRE_ESM]: require() of ES Module xxx not supported.
const chalk = esmRequire("chalk");

console.log(chalk);
