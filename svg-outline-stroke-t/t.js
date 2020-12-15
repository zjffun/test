const fs = require("fs");
// const outlineStroke = require("svg-outline-stroke");
const outlineStroke = require("./my-svg-outline-stroke");

// const strokedSVG = fs.readFileSync("./t1.svg").toString();
const strokedSVG = fs.readFileSync("./thome.svg").toString();

outlineStroke(strokedSVG).then((outlined) => {
  fs.writeFileSync("out.svg", outlined);
});
