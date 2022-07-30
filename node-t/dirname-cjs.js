const { dirname } = require("path");
const { fileURLToPath } = require("url");

const _dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

console.log(_dirname);
