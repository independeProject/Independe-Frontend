const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  devServer: {
    allowedHosts: 'all',
    port: 8081,
    proxy: {
      '^/api': {
        target: 'http://13.209.65.163:8080',
        // target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
