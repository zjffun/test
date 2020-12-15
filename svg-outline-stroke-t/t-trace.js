const fs = require("fs");
const potrace = require("potrace");
const { promisify } = require("util");

const trace = promisify(potrace.trace);

const src = fs.readFileSync("./1.png");

trace(src).then((outlined) => {
  fs.writeFileSync("out.svg", outlined);
});
