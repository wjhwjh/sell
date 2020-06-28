// 开发环境下webpack配置，在开发环境下项目运行编译执行的是这个文件
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 合并文件用的
const path = require('path') //  请求路径
const baseWebpackConfig = require('./webpack.base.conf') // webpack基本配置
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //编译html文件的对象
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') // portfinder是node的一个模块

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 利用node的express模块引入数据
const express = require('express')
const app = express() // 返回一个函数 app.handle(req, res, next);

//console.log('express方法--', app);
//console.log('express模块--', express);

let apiRouter = express.Router()
app.use('/api', apiRouter)
    //console.log('express模块的路由--', apiRouter);

let appData = require('../data.json')
    //console.log(appData)
let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings


console.log('开发环境webpack-------');
// 热加载
// merge是合并的意思
// 开发环境下 合并文件的实现
const devWebpackConfig = merge(baseWebpackConfig, {

    module: {
        // 处理css的插件
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true, // 热加载
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
        before(app) {
            app.get('/api/appData', function(req, res) {
                    res.json({
                        errno: 0,
                        data: appData
                    })
                }),
                app.get('/api/sellers', function(req, res) {
                    res.json({
                        errno: 0,
                        data: seller
                    })
                }),
                app.get('/api/goods', function(req, res) {
                    res.json({
                        errno: 0,
                        data: goods
                    })
                }),
                app.get('/api/ratings', function(req, res) {
                    res.json({
                        errno: 0,
                        data: ratings
                    })
                })
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(), // 内置热更新插件
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // 解析输出html的配置
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        // 对于静态文件static文件的复制
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

// 这里使用promise异步执行
module.exports = new Promise((resolve, reject) => {
    // 访问端口
    portfinder.basePort = process.env.PORT || config.dev.port
        //console.log('端口号--', portfinder.basePort, portfinder.getPort);

    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})