/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import rename from 'gulp-rename';
import svgMin from 'gulp-svgmin';
import svgStore from 'gulp-svgstore';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';


gulp.task('icons:development', () => gulp
  .src(config.icons.src)
  .pipe(svgStore({ inlineSvg: true }))
  .pipe(rename(config.icons.filename))
  .pipe(gulp.dest(config.icons.dest)));


gulp.task('icons:production', () => gulp
  .src(config.icons.src)
  .pipe(svgMin({
    plugins: [{
      removeViewBox: false,
    }],
  }))
  .pipe(svgStore({ inlineSvg: true }))
  .pipe(rename(config.icons.filename))
  .pipe(gulp.dest(config.icons.dest)));
