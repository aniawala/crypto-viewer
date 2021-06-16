const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.bundle.js",
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_BASE_URL": JSON.stringify(
        process.env.REACT_APP_API_BASE_URL
      ),
      "process.env.REACT_APP_API_KEY": JSON.stringify(
        process.env.REACT_APP_API_KEY
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
