// 开发环境和生产环境的一些配置
// 开发环境和生产环境需要哪些配置
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    // 开发环境下的配置
    dev: {
        // Paths
        assetsSubDirectory: 'static', // static是静态资源文件夹，也是默认值
        assetsPublicPath: '/', // 发布路径
        // 常用来配置代理API的地方，后面的host和port相信大家都知道
        proxyTable: {},

        // Various Dev Server settings
        // 服务器端配置
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false, // 是否自动打开浏览器
        errorOverlay: true, // 查询错误
        notifyOnErrors: true, // 通知错误
        //poll指跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true, // 是否使用eslint检查代码格式
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false, // 是否展示eslint提示的错误

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map', //用来方便调试的配置，它有四种模式

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        // cacheBusting 一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，默认在开发环境下为true
        cacheBusting: true,

        cssSourceMap: true //是否开启cssSourceMap
    },
    // 生产环境下的配置
    build: {
        // Template for index.html
        // 编译后index.html的路径，resolve指的事绝对路径
        index: path.resolve(__dirname, '../dist/index.html'),

        // 打包后的文件路径，后边两个和dev中的一样
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true, // 是否开启source-map
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map', // 同dev

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否压缩，具体体现在哪儿？？？？？
        productionGzipExtensions: ['js', 'css'], // gzip模式下需要压缩的文件的扩展名，设置后会对相应扩展名的文件进行压缩

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report // 是否开启打包后的分析报告
    }
}