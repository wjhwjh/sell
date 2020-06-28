// webpack基础配置，在开发环境和生产环境可以共享的
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf') // 加载vue用的一个js

// path是node里管理路径的,这里的dirname指的的是根目录，
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// eslint检查编写代码的风格，eslint配置
const createLintingRule = () => ({
    // test: /\.(js|vue)$/,
    // loader: 'eslint-loader',
    // enforce: 'pre',
    // include: [resolve('src'), resolve('test')],
    // options: {
    //     formatter: require('eslint-friendly-formatter'),
    //     emitWarning: !config.dev.showEslintErrorsInOverlay
    // }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    //resolve的属性的功能设置模块如何被解析的
    resolve: {
        //自动解析确定的扩展，在引入模块时可以不带扩展也就是后缀
        extensions: ['.js', '.vue', '.json'],
        // fallback: [path.join(__dirname, '../node_modules')],
        //为模块引入设置路径别名
        alias: {
            //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
            'vue$': 'vue/dist/vue.esm.js',
            // 用@直接指引到src目录下，如：'.src/img'可以写成'@/img'，注意这里只针对入口文件
            '@': resolve('src'),
            'common': resolve('src/common'), // 注意这里要写的路径的规则
            'components': resolve('src/components'),
        }
    },
    // module选项的作用是决定如何处理项目中的不同类型的模块
    module: {
        // rules属性配置规则
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                // vue-loader是vue项目必须的加载器，没有其它规则的时这样的简单引入，会把vue单文件
                //直接转化为js
                test: /\.vue$/, // 匹配的模块文件
                loader: 'vue-loader', // 使用的解析器
                options: vueLoaderConfig // 编译vue的规则， webpack4中这个属性已废弃
            },
            // 处理js文件
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            // 编译图片的时使用的规则
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}