// webpack4.0的配置
const path = require('path');  //引入node的path模块

const webpack = require('webpack'); //引入的webpack,使用lodash

const HtmlWebpackPlugin = require('html-webpack-plugin')  //将html打包

const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来

const CopyWebpackPlugin = require('copy-webpack-plugin')

// console.log(path.resolve(__dirname,'dist')); //物理地址拼接

module.exports = {

  entry: './src/index.js', //入口文件  在vue-cli main.js

  output: {       //webpack如何输出

    path: path.resolve(__dirname, 'dist'), //定位，输出文件的目标路径

    filename: '[name].js'

  },

  module: {       //模块的相关配置

    rules: [     //根据文件的后缀提供一个loader,解析规则

      {

        test: /\.js$/,  //es6 => es5

        include: [

          path.resolve(__dirname, 'src')

        ],

        // exclude:[], 不匹配选项（优先级高于test和include）

        use: 'babel-loader'

      },

      {

        test: /\.less$/,

        use: ExtractTextPlugin.extract({

          fallback: 'style-loader',

          use: [

            'css-loader',

            'less-loader'

          ]

        })

      },

      {       //图片loader

        test: /\.(png|jpg|gif)$/,

        use: [

          {

            loader: 'file-loader' //根据文件地址加载文件

          }

        ]

      }

    ]

  },

  resolve: { //解析模块的可选项

    // modules: [ ]//模块的查找目录 配置其他的css等文件

    extensions: [".js", ".json", ".jsx", ".less", ".css"],  //用到文件的扩展名

    alias: { //模快别名列表

      utils: path.resolve(__dirname, 'src/utils')

    }

  },

  plugins: [  //插进的引用, 压缩，分离美化

    new ExtractTextPlugin('[name].css'),  //[name] 默认  也可以自定义name  声明使用

    new HtmlWebpackPlugin({  //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线

      file: 'index.html', //打造单页面运用 最后运行的不是这个

      template: 'src/index.html'  //vue-cli放在跟目录下

    }),

    new CopyWebpackPlugin([  //src下其他的文件直接复制到dist目录下

      { from: 'src/assets/favicon.ico', to: 'favicon.ico' }

    ]),

    new webpack.ProvidePlugin({  //引用框架 jquery  lodash工具库是很多组件会复用的，省去了import

      '_': 'lodash'  //引用webpack

    })

  ],

  devServer: {  //服务于webpack-dev-server  内部封装了一个express

    port: '8080',

    // 这个比较厉害了
    before(app) {

      app.get('/api/test.json', (req, res) => {

        res.json({

          code: 200,

          message: 'Hello World'

        })

      })

    }

  }

}
