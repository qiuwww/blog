const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        // 'painter': './src/Painter.js',
        // 'setting': './src/Setting.js',
        // 'toolbar': './src/Toolbar.js',
        // 'app': './src/App.js',
        'index': './src/page/table/index.js',
        'demo': './src/page/demo/demo.js'
        // 'hello': './app/Components/Table/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            /*{
                test: /.js$/,
                enforce: 'post', // post-loader处理
                loader: 'es3ify-loader'
            },*/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css|.less$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })                
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [        
        // 代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         properties: false,
        //         warnings: false
        //     },
        //     output: {
        //         quote_keys: true
        //     },
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     sourceMap: false
        // })
        new ExtractTextWebpackPlugin('[name].css')
    ],
    resolve: {
        extensions: ['.js', '.json', '.css', '.less', '.html']
    }
};
