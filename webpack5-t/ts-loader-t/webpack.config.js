const path = require("path");

module.exports = {
  devtool: false,
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            // module: undefined,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [
    {
      react: "react",
    },
  ],
  output: {
    // library: "model-component-library-react-bc",
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
