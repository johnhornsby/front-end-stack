/* eslint-disable import/no-extraneous-dependencies */
import browserSync from 'browser-sync';
import gulp from 'gulp';
import httpProxyMiddleware from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-enable import/no-extraneous-dependencies */

import config from '../config';
import webpackConfig from '../webpack/development';


gulp.task('browserSync', (callback) => {
  const bundler = webpack(webpackConfig);

  const options = {
    open: false,
    notify: false,
    injectChanges: true,
    files: config.browserSync.files,
    server: {
      baseDir: config.browserSync.baseDir,
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: config.js.publicPath,
          noInfo: true,
        }),
        webpackHotMiddleware(bundler),
      ],
    },
  };

  if (config.browserSync.proxy) {
    options.server.middleware.push(httpProxyMiddleware({
      target: config.browserSync.proxy,
      changeOrigin: true,
    }));
  }

  browserSync.create();
  browserSync.init(options, callback);
});
