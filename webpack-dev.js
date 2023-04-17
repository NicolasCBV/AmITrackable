const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  entry: "./src/main.tsx",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: "3000",
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    hot: true,
    liveReload: true,
  },
});
