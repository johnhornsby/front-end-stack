/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import rimraf from 'rimraf';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';


gulp.task('clean', callback => rimraf(config.clean.src, callback));
