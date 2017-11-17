const path = require('path');

module.exports = {
    entry: {
        'painter': './src/Painter.js',
        'setting': './src/Setting.js',
        'toolbar': './src/Toolbar.js',
        'app': './app/App.js'
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
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
        })*/
    ],
    resolve: {
        extensions: ['.js', 'json', 'css', '.html']
    }
};
