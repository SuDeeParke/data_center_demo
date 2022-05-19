module.exports = {
  configureWebpack: (config) => {
    // 调试JS
    // eslint-disable-next-line no-param-reassign
    config.devtool = 'source-map';
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 公用scss
          resources: './src/assets/styles/main.scss',
        })
        .end();
    });
  },
};
