const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
// add this for scss
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/main.scss";`,
      },
    },
  },


})
