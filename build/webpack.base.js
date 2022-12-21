const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fileName = ['index'];

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: fileName.reduce((config = {}, file) => {
    config[file] = `./${file}.ts`;
    return config;
  }, {}),
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../cache'),
    hashAlgorithm: 'md5',
    buildDependencies: {
      config: [path.join(__dirname, '../webpack.config.js')],
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [].concat(
    fileName.map(
      (file) =>
        new HtmlWebpackPlugin({
          inject: 'head',
          template: `./${file}.html`,
          filename: `./${file}.html`,
          chunks: [file],
          minify: {
            html5: true,
            collapseWhitespace: true,
            removeComments: true,
            removeTagWhitespace: true,
          },
        }),
    ),
  ),
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(ts?|js?)$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2,
              cacheGroups: {
                default: {
                  reuseExistingChunk: true,
                  chunks: 'all',
                  priority: -20,
                  name: 'default',
                  test: /\.(ts|js)$/,
                  enforce: true,
                  minSize: 0,
                  minChunks: 2,
                },
              },
            },
          },
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name].[hash].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(mp3|wav|mpe?g|ogg)?$/i,
        type: 'asset',
        generator: {
          filename: 'assets/sounds/[name].[hash].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
          minSize: 0,
          minChunks: 1,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@data': path.resolve(__dirname, '../src/data'),
      '@view': path.resolve(__dirname, '../src/view'),
    },
    extensions: ['.ts', '.js'],
  },
};
