const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = dev => ({
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // 解析语法
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-object-rest-spread', 'transform-runtime']
                }
            },
            // 解析sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: dev ? false : true
                            }
                        },
                        {
                            loader: 'postcss-loader', options: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            // 解析图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            // 解析字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            // 解析html字符串
            {
                test: /\.html$/,
                use: ['string-loader']
            }
        ]
    },
    plugins: [
        // 提取css文件
        new ExtractTextPlugin("styles.css"),

        // 重新生成一个 入口文件 到打包目录
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // 设置全局变量
        new webpack.DefinePlugin({
            'process.env.HOST_NAME': dev ? '"http://api.webchat.com"' : '"https://api.jsonhappy.com"'
        }),
        // 把公用的包打包成一个文件
        new webpack.optimize.CommonsChunkPlugin({ name: 'common' })
    ]
});