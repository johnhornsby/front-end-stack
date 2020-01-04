/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
/* eslint-enable import/no-extraneous-dependencies */

import webpackCommonConfig from './common.config';
import config from '../config';

const entry = { ...config.js.entry };
entry.app = [...entry.app];
entry.app.unshift('webpack/hot/dev-server', 'webpack-hot-middleware/client');

export default {
  ...webpackCommonConfig,

  entry: entry,

  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    ...webpackCommonConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __CLIENT__: true,
      __SERVER__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
