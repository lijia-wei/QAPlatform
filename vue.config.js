module.exports = {
  publicPath: "./", // 构建好的文件输出到哪里

  outputDir: "./dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败

  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only

  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖

  transpileDependencies: [
      /* string or regex */
  ], // 是否为生产环境构建生成sourceMap?

  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
        'components': '@/components',
        'plugin': '@/plugin'
      }
    }
  },

  chainWebpack: () => {},

  css: {

      extract: true, // 允许生成 CSS source maps?

      sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

      loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

      modules: false
  }
}

const webpack = require('webpack')
