
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve('./src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve('./build');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = '/assets/';

module.exports = {
    context: SRC_PATH, // 设置源代码的默认根路径
    resolve: {
        extensions: ['.js', '.jsx']  // 同时支持 js 和 jsx
    },
    entry: {
        // 注意 entry 中的路径都是相对于 SRC_PATH 的路径
        vendor: './vendor',
        a: ['./entry-a'],
        b: ['./entry-b'],
        c: ['./entry-c']
    },
    output: {
        path: ASSETS_BUILD_PATH,
        publicPath: ASSETS_PUBLIC_PATH,
        filename: './[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',  // ESLint 优先级高于其他 JS 相关的 loader
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // 建议把 babel 的运行时配置放在 .babelrc 里，从而与 eslint-loader 等共享配置
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 每次打包前，先清空原来目录中的内容
        new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
        // 启用 CommonChunkPlugin
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks: Infinity
        })
    ]
};