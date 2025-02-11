'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // 网址标题
const port = 8013 // 端口配置

const webpack = require('webpack')

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: [
    "indent-string",
    "vue-ele-form-dynamic",
    "vue-ele-form/lib",
    "vuedraggable"
  ],
  devServer: {
    disableHostCheck: true,//内网穿透
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      },
      '/socket': {
          target: 'ws://localhost:9000',//后端目标接口地址
          changeOrigin: true,//是否允许跨域
          pathRewrite: {
            '^/socket': '',//重写,
          },
          ws: true //开启ws, 如果是http代理此处可以不用设置
      },
      '/baidupoiPath': { // 文件路径
        target: 'http://api.map.baidu.com/place/v2/search', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/baidupoiPath': ''
        }
      },
      '/WebService': {
        target: 'http://192.168.1.200:8000/WebService', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/WebService': ''
        }
      },
      '/arcgis': {
        target: 'http://192.168.1.147:6080/arcgis', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/arcgis': ''
        }
      },
      '/tempfile': {
        target: 'http://192.168.1.3:8807', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/tempfile': ''
        }
      },
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@crud': resolve('src/components/Crud'),
        "f-render": path.resolve(__dirname, "./src/components/fRender")
      }
    },

    devtool: "source-map",

    plugins: [new LodashModuleReplacementPlugin()]
  },

  chainWebpack: config => {
    // config.plugins.delete('preload') // TODO: need test
    // config.plugins.delete('prefetch') // TODO: need test


    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 不编译 iView Pro
    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude
      .add(resolve('src/iview-pro'))
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
        }
      )

    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill',
      'Quill': 'quill'
    }]);
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
}
