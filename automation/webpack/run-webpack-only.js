/**
 * Node script created to be run from packages to directly build JS with webpack
 * using the existing ES6 production.js config
 */
require('@babel/register');

const webpack = require('webpack');
const config = require('./common.config');
const process = require('process');

const updatedConfig = config.default;
updatedConfig.stats = 'verbose';

console.log(`

--------------------------
  run webpack only start
--------------------------
`);

webpack(updatedConfig, (err, stats) => {
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );

  // Stats Object
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log('run webpack only error:', err, ' stats has errors:', stats.hasErrors());
    process.exit();
  }

  // Done processing
  console.log(`
----------------------------
  run webpack only complete
----------------------------

  `);
  process.exit();
});
