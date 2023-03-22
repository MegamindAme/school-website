var webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


// the path(s) that should be cleaned
let pathsToClean = ['src']

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false
}


module.exports = {
  externals: {
    'TweenLite': 'TweenLite'
  },
  entry: {
    libs: [
      '../src/js/libs.js',
      '../src/sass/libs.scss'
    ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?url=false', 'sass-loader'],
          fallback: "style-loader",
        })
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          },
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new ExtractTextPlugin("css/[name].css"),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'src/img'),
      },
      {
        from: path.resolve(__dirname, 'src/flags'),
        to: path.resolve(__dirname, 'src/flags'),
      },
      {
        from: path.resolve(__dirname, 'src/fonts'),
        to: path.resolve(__dirname, 'src/fonts'),
      },
      {
        from: path.resolve(__dirname, 'src/rs-plugin'),
        to: path.resolve(__dirname, 'src/rs-plugin'),
      },
      {
        from: path.resolve(__dirname, 'src/uploads'),
        to: path.resolve(__dirname, 'src/uploads'),
      }
    ], {}),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false
    })
  ]
};
