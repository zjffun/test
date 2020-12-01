const presets = [
  [
    "@babel/env",
    {
      targets: ["IE 6"],
      useBuiltIns: "entry",
      corejs: 3,
    },
  ],
];

module.exports = {
  presets,
};
