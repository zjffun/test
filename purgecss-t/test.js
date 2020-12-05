const fs = require("fs");
const PurgeCSS = require("purgecss").default;

(async function () {
  const result = await new PurgeCSS().purge({
    content: ["index.html"],
    css: ["app.css"],
  });
  fs.writeFileSync("./out.css", result[0].css);
})();
