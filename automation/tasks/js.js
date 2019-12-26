/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import webpack from 'webpack';
/* eslint-enable import/no-extraneous-dependencies */

import webpackConfig from '../webpack/common.config';

gulp.task('js:production', callback => webpack(webpackConfig, callback));
