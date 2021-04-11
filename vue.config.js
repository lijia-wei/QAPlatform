module.exports = {
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
  }
}
const webpack = require('webpack')
module.exports = {
  outputDir:  "./dist",
  publicPath: './',
  configureWebpack: {
    entry: __dirname + '/src/main.js',
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
    module: {
      rules: [

        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    }
  }
}