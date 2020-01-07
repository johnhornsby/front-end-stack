/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';

export default {
  // this outputs source maps to the js folder
  devtool: 'source-map',

  mode: 'production',

  entry: config.js.entry,

  output: {
    path: config.js.path,
    chunkFilename: config.js.chunkFilename,
    filename: config.js.filename,
    publicPath: config.js.publicPath,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../../app')],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDom',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __CLIENT__: true,
      __SERVER__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
