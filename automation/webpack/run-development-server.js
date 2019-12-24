require('@babel/register');

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var proxy = require('http-proxy-middleware');

const app = express();
const config = require('./common.config.js').default;

config.mode = 'development';
config.devtool = 'inline-source-map';
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);

app.use('/', express.static('./'));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(require('webpack-hot-middleware')(compiler));

app.use('/', proxy({ target: 'ccc.local', changeOrigin: true }));

// Serve the files on port 3000.
app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
});
