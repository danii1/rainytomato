'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/pack/**/*.js',
      'test/helpers/react/**/*.js',
      'test/spec/components/**/*.js',
      'test/spec/stores/**/*.js',
      'test/spec/actions/**/*.js'
    ],
    preprocessors: {
      'test/helpers/createComponent.js': ['webpack'],
      'test/spec/components/**/*.js': ['webpack'],
      'test/spec/components/**/*.jsx': ['webpack'],
      'test/spec/stores/**/*.js': ['webpack'],
      'test/spec/actions/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }, {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        }]
      },
      postcss: [autoprefixer, precss],
      resolve: {
        alias: {
          'root': path.join(process.cwd(), './src/'),
          'styles': path.join(process.cwd(), './src/styles/'),
          'images': path.join(process.cwd(), '/src/assets/images'),
          'components': path.join(process.cwd(), './src/components/'),
          'routes': path.join(process.cwd(), './src/routes/'),
          'stores': '../../../src/stores/',
          'actions': '../../../src/actions/',
          'helpers': path.join(process.cwd(), './test/helpers/')
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
    port: 8080,
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
