'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/pack/**/*.js',
      'test/helpers/react/**/*.js',
      'test/spec/components/**/*.js',
      'test/spec/helpers/**/*.js',
      'test/spec/stores/**/*.js',
      'test/spec/actions/**/*.js'
    ],
    preprocessors: {
      'test/helpers/createComponent.js': ['webpack'],
      'test/spec/components/**/*.js': ['webpack'],
      'test/spec/components/**/*.jsx': ['webpack'],
      'test/spec/stores/**/*.js': ['webpack'],
      'test/spec/actions/**/*.js': ['webpack'],
      'test/spec/helpers/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader?optional=es7.decorators&stage=0',
          exclude: /node_modules/
        }, {
          test: /\.(css|scss)$/,
          loader: 'style-loader!css-loader!sass-loader!postcss-loader'
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
        new webpack.ProvidePlugin({
          Howler: 'howler'
        })
      ],
      resolve: {
        alias: {
          'howler': __dirname + '/node_modules/howler/howler.js',
          'root': path.join(process.cwd(), './src/'),
          'styles': path.join(process.cwd(), './src/styles/'),
          'images': path.join(process.cwd(), '/src/assets/images'),
          'sounds': path.join(process.cwd(), '/src/assets/sounds'),
          'components': path.join(process.cwd(), './src/components/'),
          'routes': path.join(process.cwd(), './src/routes/'),
          'models': path.join(process.cwd(), './src/models/'),
          'helpers': path.join(process.cwd(), './src/helpers/'),
          'stores':  path.join(process.cwd(), './src/stores/'),
          'actions': path.join(process.cwd(), './src/actions/'),
          'test_helpers': path.join(process.cwd(), './test/helpers/')
        }
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8081,
    logLevel: config.LOG_INFO,
    colors: true,
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    captureTimeout: 60000,
    plugins: [
        require('karma-webpack'),
        require('karma-jasmine'),
        require('karma-phantomjs-launcher')
    ]
  });
};
