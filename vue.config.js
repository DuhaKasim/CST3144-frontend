const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/CST3144-frontend/',
  transpileDependencies: true,
  devServer: {
    proxy: 'http://localhost:8000'
  }
})
