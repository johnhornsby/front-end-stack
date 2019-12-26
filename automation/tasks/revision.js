/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import revAll from 'gulp-rev-all';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';


gulp.task('revision', () => gulp
  .src(config.revision.src)
  .pipe(revAll.revision({
    dontRenameFile: config.revision.dontRenameFile,
    dontUpdateReference: config.revision.dontUpdateReference,
  }))
  .pipe(gulp.dest(config.revision.dest)));
