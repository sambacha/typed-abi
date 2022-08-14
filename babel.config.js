module.exports = (api, targets) => {
  // https://babeljs.io/docs/en/config-files#config-function-api
  const isTestEnv = api.env('test');

  return {
    babelrc: false,
    ignore: ['./node_modules'],
    presets: [
      [
        "@babel/preset-typescript",
      ],
    ],
    plugins: 
      ['@babel/plugin-transform-typescript',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-syntax-bigint"
    ],
  };
};