/**
 * Test HTTPS Server serving development.html under https for standalone local development boilerplate.
 *
 * Follow instructions to add a root local certificate if you have not already got one, and issue a new
 * certificate for your development site if need be.
 * https://reactpaths.com/how-to-get-https-working-in-localhost-development-environment-f17de34af046
 *
 * Once created add them into a 'ssl' folder in the root of this project or edit the code below.
 *
 * Add front-end-stack.local to your hosts file.
 *
 */
var chalk = require('chalk');
var express = require('express');
var ip = require('./automation/util/get-ip');

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('ssl/front-end-stack.local.key'),
  cert: fs.readFileSync('ssl/front-end-stack.local.crt'),
};

const port = 443;

const app = express();

app.use('/', express.static('./'));

https.createServer(options, app).listen(port, function() {
  console.log(`
-------------------------------------
Externally: ${chalk.cyan.underline('https://' + ip + '/development.html')}
Locally:   ${chalk.cyan.underline('https://localhost/development.html')}
-------------------------------------

  `);
});
