const presets = [
  [
    "@babel/env",
    {
      targets: {},
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = {
  presets,
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      /**
       * 因为 The official decorator proposals doesn't allow decorators before exports anymore.
       * https://github.com/babel/babel/issues/9964#issuecomment-491968375
       * 所以要加上配置
       */
      { legacy: true },
    ],
  ],
};
