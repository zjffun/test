const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "alias-test": "./alias1/alias2",
    },
  },
};
