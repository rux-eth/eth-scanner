/* global __dirname, require, module*/

require("dotenv").config();
require("./package.json");

const webpack = require("webpack");
const path = require("path");
const env = require("yargs").argv.env;
const ESLintPlugin = require("eslint-webpack-plugin");
const pkg = require("./package.json");

const libName = "eth-scanner";

let outputFile;
let mode;

if (env === "build") {
  mode = "production";
  outputFile = `${libName}.min.js`;
} else {
  mode = "development";
  outputFile = `${libName}.js`;
}
const config = {
  mode: mode,
  entry: __dirname + "/src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  plugins: [new ESLintPlugin()],
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".ts", ".tsx", ".js"],
  },
};
/* const config = {
  mode,
  entry: `${__dirname}/src/index.ts`,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: outputFile,
    path: `${__dirname}/lib`,
    library: libName,
  },
  plugins: [new ESLintPlugin()],
  target: "node",
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".tsx", ".ts", ".js"],
  },
}; */
/* const config = {
  mode,
  entry: `${__dirname}/bin/index.js`,
  devtool: "inline-source-map",
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  target: "node",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new ESLintPlugin(),
  ],
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"],
  },
}; */
module.exports = config;
