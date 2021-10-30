module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'examples/main.js', // 走示例项目，需要 npm run lib 后才能使用
      // entry: 'packages/VueTestcaseMinderEditor/main.js', // 走主工程项目，可直接 npm run serve 使用。方便调试时查看源码堆栈
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(require('path').join(__dirname, '..', 'packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  lintOnSave: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    devtool: 'source-map'
  }
}
