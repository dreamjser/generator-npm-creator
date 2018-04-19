const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/<%= packageName %>.js",
  output: {
    library: "<%= packageName %>",
    libraryTarget: "umd",
    filename: "<%= packageName %>.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
