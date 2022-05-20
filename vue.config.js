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
  devServer: {
    proxy: {
      '/basic_api': {
        target: 'http://127.0.0.1:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/basic_api': '',
        },
      },
    },
  },
};
