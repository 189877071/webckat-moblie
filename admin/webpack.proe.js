const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common(), {
    plugins: [
        // 打包前先删除打包目录
        new CleanWebpackPlugin(['dist']),
        // 压缩插件
        new UglifyJsWebpackPlugin()
    ]
});
