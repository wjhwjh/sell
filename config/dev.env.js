// 开发环境
'use strict'
const merge = require('webpack-merge') // merge可以将两个文件合并为同一个文件
const prodEnv = require('./prod.env')
console.log(prodEnv);
// merge合并配置中的两个对象，为什么要合并
// 这里是合并后到处node_env， 后边的对象被优先使用
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
})