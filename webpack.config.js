const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// const config = require('./config');

const isProd = process.env.NODE_ENV === "production";
const publicPath = "/";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd
    ? {
        docs: "./packages/index.js",
      }
    : "./src/main.ts",
  output: {
    path: path.resolve(process.cwd(), "./packages/wxq-ui/"),
    publicPath: publicPath,
    filename: "[name].[hash:7].js",
    chunkFilename: isProd ? "[name].[hash:7].js" : "[name].js",
  },
  resolve: {
    extensions: [".vue", ".ts", ".tsx", ".js", ".jsx"],
    // alias: config.alias,
    modules: ["node_modules"],
  },
  devServer: {
    host: "127.0.0.1",
    port: 8085,
    publicPath: publicPath,
    hot: true,
  },
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      //   {
      //     enforce: "pre",
      //     test: /\.(vue|jsx?)$/,
      //     exclude: /node_modules/,
      //     loader: "eslint-loader",
      //   },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              // useBabel: true,
              // useCache: true,
              // babelCore: "@babel/core",
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        // todo: 这种写法有待调整
        // query: {
        //   limit: 10000,
        //   name: path.posix.join("static", "[name].[hash:7].[ext]"),
        // },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "./index.html",
      //   favicon: "./examples/favicon.ico",
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.FAAS_ENV": JSON.stringify(process.env.FAAS_ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    }),
  ],
  optimization: {
    minimizer: [],
  },
  devtool: isProd ? "source-map" : "inline-source-map",
};

if (isProd) {
  webpackConfig.externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    "highlight.js": "hljs",
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:7].css",
    })
  );
  webpackConfig.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "element-ui",
        chunks: "all",
      },
    },
  };
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
