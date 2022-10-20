const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  pages:{
    index:{
      title:"网抑云音乐",
      entry:"src/main.js"

    }
  }

})
 