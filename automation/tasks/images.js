/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import util from 'gulp-util';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';


gulp.task('images:development', () => gulp
  .src(config.images.src)
  .pipe(gulp.dest(config.images.dest)));


gulp.task('images:production', () => gulp
  .src(config.images.src)
  .pipe(imageMin([
    imageMin.gifsicle(),
    imageMin.jpegtran(),
    imageMin.optipng(),
    imageMin.svgo({
      plugins: [
        { removeUselessDefs: false },
        { cleanupIDs: false },
      ],
    }),
  ]).on('error', util.log))
  .pipe(gulp.dest(config.images.dest)));
