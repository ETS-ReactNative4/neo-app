module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['lodash'],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],

  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
