const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ROOT_PATH = path.resolve();

module.exports = {
  // entry: {
  //   app: path.resolve(ROOT_PATH, './src/frame/index.js'),
  //   login: path.resolve(ROOT_PATH, './src/login/index.js'),
  // },
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(ROOT_PATH, './dist'),
  // },
  resolve: {
    alias: {
      '@': path.resolve(ROOT_PATH, './src'),
    },
    extensions: ['.jsx', '.js', '.json',],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(ROOT_PATH, './public/index.html'),
  //     filename: 'index.html',
  //     chunks: ['app'],             
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(ROOT_PATH, './public/login.html'),
  //     filename: 'login.html',
  //     chunks: ['login'],             
  //   }),
  // ],
};
