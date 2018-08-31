const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.tsx'],
    alias: {
      ui: path.resolve(__dirname, '../src/ui'),
      tools: path.resolve(__dirname, '../src/components/tools'),
      content: path.resolve(__dirname, '../src/components/content'),
      manager: path.resolve(__dirname, '../src/components/manager'),
      util: path.resolve(__dirname, '../src/util'),
      stores: path.resolve(__dirname, '../src/stores')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.[s]?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg|eot|woff|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9001,
    hot: true,
    inline: true,
    open: true
  }
}
