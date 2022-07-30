const esmRequire = require("esm")(module, {
  mainFields: ["exports"],
  force: true,
});

const chalk = esmRequire("chalk");

console.log(chalk);
