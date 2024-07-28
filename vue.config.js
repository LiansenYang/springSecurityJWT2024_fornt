const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  //代理可以写多个，代理不同的后端地址
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 将请求代理到后端的地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路径，后端接受到的将不带/api
          },
      "/map": {
        target: "http://localhost:6000", // 将请求代理到后端的地址
        changeOrigin: true,
        pathRewrite: {
          "^/map": "", // 重写路径，后端接受到的将不带/map
          },
        },
      },
    }
  },
  lintOnSave: false
});
