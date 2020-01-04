/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
/* eslint-enable import/no-extraneous-dependencies */

import webpackCommonConfig from './common.config';
import config from '../config';

export default {
  ...webpackCommonConfig,

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};
