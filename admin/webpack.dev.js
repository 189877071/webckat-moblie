const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common(true), {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        inline: true  // 启动自动刷新
    },
    plugins: [
        //热加载插件
        new webpack.HotModuleReplacementPlugin(),
    ]
})