module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    mode: process.env.VUE_APP_MODE !== 'development' ? 'production' : 'development',
    resolve: {
      symlinks: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

