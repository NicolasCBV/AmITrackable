const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new Webpack.DefinePlugin({
      NODE_ENV: "production",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  performance: {
    maxEntrypointSize: 312000,
    maxAssetSize: 312000,
  },
});
