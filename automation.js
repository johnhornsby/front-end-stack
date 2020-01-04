import { task, series, parallel } from 'gulp';

import './automation/tasks/browserSync';
import './automation/tasks/developmentServer';
import './automation/tasks/clean';
import './automation/tasks/fonts';
import './automation/tasks/icons';
import './automation/tasks/images';
import './automation/tasks/js';
import './automation/tasks/scss';
import './automation/tasks/watch';

task(
  'dev',
  series(
    'clean',
    parallel('fonts', 'icons:development', 'images:development', 'scss:development'),
    parallel('watch', 'browserSync')
  )
);

task(
  'default',
  series(
    'clean',
    parallel('fonts', 'icons:production', 'images:production', 'js:production', 'scss:production')
  )
);
