const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: ['./index'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name]bundle.js',
      chunkFilename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,
              outputPath: 'assets',
              name: '[name].[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.svg/,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,js}',
        },
      }),
    ],
    devtool: isProduction ? false : 'inline-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: isProduction,
    },
  };
};
