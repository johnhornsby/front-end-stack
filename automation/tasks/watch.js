/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import watch from 'gulp-watch';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';

import './scss';


gulp.task('watch', () => {
  watch(config.scss.watch, () => gulp.start('scss:development'));
});
