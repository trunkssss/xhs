const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const ROOT_PATH = path.resolve();

const getCssLoaders = (isModule) => {
  const cssLoader = isModule ? {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]-[local]-[hash:5]',
      },
    },
  } : 'css-loader';

  return [
    MiniCssExtractPlugin.loader,
    cssLoader,
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: true,
                },
              },
            ],
          ],
        },
      },
    },
  ];
};

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
      {
        test: /\.css$/,
        use: [...getCssLoaders(false),],
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: [
              ...getCssLoaders(true),
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            use: [
              ...getCssLoaders(false),
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false,
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
  ],
};
