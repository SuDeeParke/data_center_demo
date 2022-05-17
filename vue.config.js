module.exports = {
  configureWebpack: (config) => {
    // 调试JS
    // eslint-disable-next-line no-param-reassign
    config.devtool = 'source-map';
  },
};
