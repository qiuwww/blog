const path = require('path');
const webpack = require('webpack');
// 复制并压缩html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// extract-text-webpack-plugin 插件 -> 替代插件 mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack指令需要的运行配置
const SRC = path.resolve(__dirname, '../src');

module.exports = {
  target: 'web', // <=== 默认是 'web'，可省略
  // 多入口文件
  entry: {
    index: path.resolve(SRC, 'javascripts/index.js'),
    main: path.resolve(SRC, 'javascripts/main.js'),
    test: path.resolve(SRC, 'javascripts/test.ts'),
    vendor: ['babel-polyfill']
  },
  // js输出地址，output选项指定webpack输出的位置
  output: {
    // 指示输出的目录，对应一个绝对路径
    path: path.resolve(SRC, '../dist'), //定位，输出文件的目标路径
    // 该配置能帮助你为项目中的所有资源指定一个 基础路径， 它被称为公共路径(publicPath)。
    // 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    filename: 'js/[name]-[chunkhash:7].js',
    publicPath: '/'
  },
  // 模块的相关配置
  module: {
    // 根据文件的后缀提供一个loader,解析规则
    rules: [{
        // es6+ => es5
        test: /\.js$/,
        // exclude:[], 不匹配选项（优先级高于test和include）
        exclude: /node_modules/,
        include: [
          path.resolve(SRC, './')
        ],
        // 使用缓存来提高编译速度
        use: {
          loader: 'babel-loader?cacheDirectory',
          // 这里等于.babelrc文件的配置
          // options: []
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        //  解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
        test: /\.(less|css)$/,
        use: [
          // 这里dev与prod下的操作是不一样的
          this.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'style-loader', // 将生成 style 标签，将 css 内容插入 HTML
          // {
          //   loader: MiniCssExtractPlugin.loader, // 提取css到指定的文件夹内
          //   options: {}
          // },
          'css-loader', // 将内容引入 @import 所在的 css 文件内
          'postcss-loader', // 进行前缀添加等其他处理
          'less-loader' // 先处理 less 语法
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: false,
            removeComments: false,
            collapseWhitespace: true
          }
        }]
      },
      {
        // 静态资源处理
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader', // 根据文件地址加载文件
          options: {
            fallback: 'responsive-loader',
            // 在文件大小（ 单位 byte） 低于指定的限制时， 可以返回一个 DataURL。
            limit: 8192,
            quality: 85,
            name: 'imgs/[name].[hash:7].[ext]',
          }
        }]
      }
    ]
  },
  // 解析模块的可选项
  resolve: {
    // 自动解析确定的扩展
    extensions: [".js", ".json", "ts", ".jsx", ".less", ".css"], //用到文件的扩展名
    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
      // 别名，便于快速引用
      'utils': path.resolve(SRC, './utils'),
      'assets': path.resolve(SRC, './assets'),
      '@': SRC
    },
    modules: [
      SRC,
      path.resolve('node_modules')
    ],
  },
  // 插件
  plugins: [
    // [name] 默认  也可以自定义name，声明使用
    new MiniCssExtractPlugin({
      // 输出到单独的 css 文件夹下
      filename: "css/[name]-[chunkhash:7].css"
    }),
    // 将模板的头部和尾部添加css和js模板，dist 目录发布到服务器上，项目包。可以直接上线
    // 生成页面
    new HtmlWebpackPlugin({
      title: 'index',
      file: 'index.html',
      template: 'src/index.html',
      chunks: ['index', 'test', 'vendor']
    }),
    // 引用框架 jquery lodash工具库是很多组件会复用的，省去了import
    // 直接引用
    new webpack.ProvidePlugin({
      '_': 'lodash' // 引用webpack
    })
  ]
}
