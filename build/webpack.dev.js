const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultUrls = [];

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  plugins: [
    new FriendlyWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: '../tsconfig.json',
      },
      devServer: true,
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.js'],
      failOnError: false,
      exclude: 'node_modules',
    }),
  ].filter(Boolean),
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    allowedHosts: 'auto',
    open: true,
    compress: false,
    port: 4322,
    hot: false,
    proxy: {
      context: defaultUrls.map((itUrl) => `/${itUrl}`),
      '/api': {
        target: 'http://localhost:4321',
        pathRewrite: { '^/api': '' },
      },
      before(app) {
        app.use((req, res, next) => {
          if (req.url.indexOf('/api') === 0 || req.url.indexOf('/static') === 0) {
            res.setHeader('Access-Control-Allow-Origin', '*');
          }
          next();
        });
      },
    },
  },
};
