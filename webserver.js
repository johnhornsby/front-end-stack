/**
 * Test HTTPS Server serving development.html under https
 */
var chalk = require('chalk');
var express = require('express');
var ip = require('./automation/util/get-ip');

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
};

const port = 443;

const app = express();

app.use('/', express.static('./'));

https.createServer(options, app).listen(port, function() {
  console.log(`
-------------------------------------
Exterally: ${chalk.cyan.underline('https://' + ip + ':' + port)}
Locally:   ${chalk.cyan.underline('https://localhost:' + port)}
-------------------------------------

  `);
});
