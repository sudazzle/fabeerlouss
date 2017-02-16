const { resolve } = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`
  },

  externals: {
    'config': JSON.stringify((process.env.ENV === 'production') ? require('./config.prod.json') : require('./config.dev.json'))
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$|\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.png$/,
        use: ['file-loader']
      }
    ],
  },

  plugins: (process.env.NODE_ENV === 'production') ? [
      new webpack.optimize.UglifyJsPlugin({compress: {warning: false}})
      // runs UglifyJS in order to minimize the output
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates

      // performs search-and-replace operations on the original source code

      new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    // opens a browser after bundling is finished
  ],
};