/**
 * Script to check for and initialise Sentry.
 *
 * The const string below should be present in Octopus for them to be replaced
 * within the app file upon deployment.
 *
 * To use, simply add this as high up as possible in your entry app file
 * import './util/sentry';
 */

import * as Sentry from '@sentry/browser';

const dsn = '#{SentryDsn}';
const environment = '#{Octopus.Environment.Name}';
const release = '#{Octopus.Release.Number}';

const scripts = Array.from(document.scripts);

let friendlyName = 'unknown';
if (process && process.env && process.env.USERNAME) {
  friendlyName = process.env.USERNAME;
}

const sentryScript = scripts.find(
  script => script.src && script.src.indexOf('sentry-cdn.com') > -1
);

if (Sentry && sentryScript) {
  if (dsn.indexOf('@sentry.io') > -1) {
    Sentry.init({ dsn, release, environment });
  }
  Sentry.configureScope(scope => {
    scope.setUser({ username: friendlyName });
  });
}
