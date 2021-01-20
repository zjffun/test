// npx webpack -c webpack-babel-include.config.js
const path = require("path");

module.exports = {
  entry: "./src/babel-include.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: function (modulePath) {
          console.log(modulePath);
          return (
            /node_modules/.test(modulePath) && !/test-pkg/.test(modulePath)
          );
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "IE 10" }]],
          },
        },
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "test-pkg"),
        ],
      },
    ],
  },
};
