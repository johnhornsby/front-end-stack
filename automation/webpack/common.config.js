/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */

export default {
  // this outputs source maps to the js folder
  devtool: 'source-map',

  mode: 'production',

  entry: {
    app: ['webpack-hot-middleware/client', './app/app.ts'],
  },

  output: {
    path: path.resolve(__dirname, '../../dist/js/'),
    chunkFilename: '[name].js',
    filename: '[name].js',
    publicPath: '/dist/js/',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../../app')],
        exclude: /node_modules/,
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // modules: ["app", "node_modules"],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDom',
  },
  plugins: [],
  // plugins: [
  //   new webpack.DefinePlugin({
  //     __DEVELOPMENT__: false,
  //     __CLIENT__: true,
  //     __SERVER__: false,
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production'),
  //     },
  //   }),
  // ],
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //     }),
  //   ],
  // },
};
