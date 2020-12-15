const fs = require("fs");
const potrace = require("potrace");
const sharp = require("sharp");
const { promisify } = require("util");

const trace = promisify(potrace.trace);

const outlineStroke = (input, params) => {
  const src = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return sharp(src)
    .toBuffer()
    .then((buff) => {
      fs.writeFileSync("sharp.jpg", buff);
      return trace(buff, params);
    });
};

exports = module.exports = outlineStroke;
