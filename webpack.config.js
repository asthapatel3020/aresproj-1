var path = require("path");
var webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    'webpack-dev-server/client?http://localhost:5050',
    'webpack/hot/only-dev-server',
    // 'react-hot-loader/patch',
    './index'
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: { "react/lib/ReactMount": "react-dom/lib/ReactMount" }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new BundleAnalyzerPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        // loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ["url-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
