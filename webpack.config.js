const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {browserslist} = require('./package.json');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules/']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          babelrc: false,
          comments: false,
          env: {
            development: {
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false
                  }
                ],
                ['@babel/plugin-proposal-class-properties', {loose: true}],
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ],
                '@babel/plugin-transform-object-assign' // For IE
              ]
            },
            production: {
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false
                  }
                ],
                ['@babel/plugin-proposal-class-properties', {loose: true}],
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ],
                '@babel/plugin-transform-object-assign', // For IE
                'babel-plugin-transform-react-remove-prop-types'
              ]
            }
          },
          plugins: [],
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true,
                modules: 'commonjs',
                targets: {
                  browsers: browserslist
                },
                useBuiltIns: false
              }
            ],
            '@babel/preset-react'
          ]
        }
      }
    ]
  },
  externals: {
    'jquery/dist/jquery.slim': 'jQuery',
    'lodash/lodash': '_'
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        include: /\.min\.js$/
      })
    ]
  }
};
