//首先要安装webpack-merge插件
let webpackMerge = require('webpack-merge');
let webpackBase = require('./webpack.base.js');

module.exports = webpackMerge(webpackBase,{
     mode: 'development' //模式 默认两种环境 production生产 development开发
    //  plugins: []
})

//在package.json文件中的scripts下的配置 "build": "webpack --config webpack.dev.js", //启动打包开发环境
