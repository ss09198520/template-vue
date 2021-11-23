'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true,
    port: 9001,
    host: '127.0.0.1',
    proxy: {
        '/*': {
            target: 'http://localhost:8080',
            ws: true,
            changeOrigin: true
        }
    }
  },
  publicPath : "/tpes"
}