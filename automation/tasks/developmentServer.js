import chalk from 'chalk';
import express from 'express';
import gulp from 'gulp';
import proxy from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import config from '../config';

import webpackConfig from '../webpack/common.config';
import ip from '../util/get-ip';

gulp.task('developmentServer', callback => {
  const app = express();

  webpackConfig.mode = 'development';
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(webpackConfig);

  // app.use('/', express.static('./'));
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(
    '/',
    proxy({
      target: 'https://typescript.local',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    })
  );

  // Serve the files on port 3000.
  app.listen(3000, function() {
    console.log(`
--------------------------------------
  ${chalk.hex('#FF00FF')('Development Server running on')}

  Externally: ${chalk.cyan.underline('http://' + ip + ':3000')}
  Locally:   ${chalk.cyan.underline('http://localhost:3000')}
--------------------------------------

    `);
  });
});
