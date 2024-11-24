const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // Separate source maps for production
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    filename: "bundle.[contenthash].js", // Cache busting with content hash
    publicPath: "/", // Ensure this matches your Nginx configuration
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to separate files
          "css-loader",
        ],
      },
      // Add other loaders as needed
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all", // Code splitting
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", // Extracted CSS with cache busting
    }),
    // Add other plugins as needed
  ],
});
