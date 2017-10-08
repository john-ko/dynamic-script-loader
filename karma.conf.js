const path = require('path')

module.exports = function(config) {
  config.set({

    files: [
      // all files ending in 'test'
      'test/e2e/*.spec.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      'test/e2e/*.spec.js': ['webpack']
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {

      dir: 'build/coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'text-summary' }
      ]
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['es2015']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },

    plugins: [
      require('karma-webpack'),
      require('istanbul-instrumenter-loader'),
      require('karma-mocha'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher')
    ],

    browsers: ['Chrome']
  })
}