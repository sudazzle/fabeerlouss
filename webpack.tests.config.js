const { resolve } = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'tests'),
  entry: [
  'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3002',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './entry-file.js'],
    // the entry point of our app

  output: {
    filename: 'test.bundle.js',
    // the output bundle

    path: resolve(__dirname, 'unit-tests'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  externals: {
  'cheerio': 'window',
  'react/addons': true, // important!!
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
},

  devtool: 'inline-source-map',

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

devServer: {
  host: 'localhost',
  port: '3002'
},


  plugins: [
  new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new OpenBrowserPlugin({ url: 'http://localhost:3002' })
  ],
};