// .babelrc 只会影响本项目中的代码；babel.config.js 会影响整个项目中的代码，包含node_modules中的代码
// 推荐使用：babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {}]],
  plugins: [['@babel/plugin-transform-runtime', {}], '@babel/plugin-transform-modules-commonjs'],
};
