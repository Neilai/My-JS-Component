/**
 * Created by Neil
 * 2018-07-06 12:55
 */
const webpack = require('webpack')
const path = require('path');
module.exports = {
    entry: './index.js',
    mode: "development",
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: 'magicUI.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                },
                ]
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        overlay: true,
        hot:true,
        open:true,
        contentBase:"./",
    },

};
