module.exports = function(api) {
  api.cache(true); // babeljs.io/docs/en/config-files#apicache

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          // https://browserl.ist/?q=%3E+0.5%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+ie+%3E%3D+11
          browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'ie >= 11'], // the default + ie 11
        },
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposal: true,
        },
      },
    ],
    '@babel/typescript',
  ];
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ];

  return {
    presets,
    plugins,
  };
};
