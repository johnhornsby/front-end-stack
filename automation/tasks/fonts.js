// eslint-disable-next-line import/no-extraneous-dependencies
import gulp from 'gulp';

import config from '../config';


gulp.task('fonts', () => gulp
  .src(config.fonts.src)
  .pipe(gulp.dest(config.fonts.dest)));
