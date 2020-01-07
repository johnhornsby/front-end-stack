/* eslint-disable import/no-extraneous-dependencies */
import { task, series, watch } from 'gulp';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';

import './scss';

task('watch', () => {
  watch(config.scss.watch, series('scss:development'));
});
