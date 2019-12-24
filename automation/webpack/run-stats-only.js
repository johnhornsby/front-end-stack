/**
 * Node script created to be run from package to directly build JS with webpack
 * and inject the BundleAnalyzer plugin into the existing ES6 production.js config
 */
require('@babel/register');

const webpack = require('webpack');
const config = require('./common.config');
const process = require('process');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const statsConfig = config.default;
statsConfig.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    openAnalyzer: true,
    generateStatsFile: true,
  })
);

console.log('run stats only start');

webpack(statsConfig, (err, stats) => {
  // Stats Object
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log('run stats only error:', err, ' stats has errors:', stats.toString('errors-only'));
    process.exit();
  }
  // Done processing
  console.log('run stats only complete');
  process.exit();
});
