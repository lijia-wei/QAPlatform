module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    "transform-remove-strict-mode"  //配置插件,移除严格模式 
    //配置方法 npm install --save @vue/composition-api
  ]
}
