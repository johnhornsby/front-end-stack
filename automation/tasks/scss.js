/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';
import gulp from 'gulp';
import postCSS from 'gulp-postcss';
import sass from 'gulp-sass';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';


function logError(error) {
  const line1 = `File: ${error.relativePath}:${error.line}`;
  const line2 = `Error: ${error.messageOriginal}`;
  process.stderr.write(`\n${line1}\n${line2}\n\n`);
  this.emit('end');
}


gulp.task('scss:development', () => gulp
  .src(config.scss.src)
  .pipe(sass({
    precision: 5,
    sourceMapEmbed: true,
    sourceMapContents: true,
  }).on('error', logError))
  .pipe(postCSS([autoprefixer()]))
  .pipe(gulp.dest(config.scss.dest)));


gulp.task('scss:production', () => gulp
  .src(config.scss.src)
  .pipe(sass({ precision: 5 }).on('error', logError))
  .pipe(postCSS([autoprefixer(), cssNano()]))
  .pipe(gulp.dest(config.scss.dest)));
