module.exports={
  configureWebpack:{
    resolve:{
      alias:{
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
    configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ]
  }
}