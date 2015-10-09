/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/app.js', 'font-awesome-webpack!./font-awesome.config.js'],
  output: {
    publicPath: 'assets/',
    path: 'dist/assets/',
    filename: 'app.js',
    hash: true
  },

  debug: false,
  devtool: false,

  stats: {
    colors: true,
    reasons: false
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'howler': __dirname + '/node_modules/howler/howler.js',
      'styles': __dirname + '/src/assets/css',
      'images': __dirname + '/src/assets/images',
      'sounds': __dirname + '/src/assets/sounds',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/',
      'routes': __dirname + '/src/routes/',
      'stores': __dirname + '/src/stores/',
      'actions': __dirname + '/src/actions/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/, /vendor/],
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?optional=es7.decorators&stage=0'
    }, {
      test: /\.(css|scss)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    }, {
      test: /\.(png|jpg|otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(wav|ogg|mp3)(\?.+)?$/,
      loader: 'file-loader'
    }]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          'YOUTUBE_KEY': JSON.stringify(process.env.RAINY_TOMATO_YOUTUBE_KEY),
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.ProvidePlugin({
      Howler: 'howler'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('main', 'main-[chunkhash].js', false),
    new HtmlWebpackPlugin({
      append: true,
      inject: 'body',
      filename: '../index.html',
      template: './src/assets/index.template.html',
      favicon: './src/assets/favicon.ico'
    }),
    new ExtractTextPlugin("main-[chunkhash].css", {
      publicPath: '/assets/',
      allChunks: true
    })
  ]
};
