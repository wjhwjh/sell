# sell

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目说明

用到的知识点：
1. vue.js
2. vue-cli
3. vue-router
4. vue-resource Ajax通信
5. webpack 构建工具
6. es6+eslint eslint:es6代码风格检查工具
7. 工程化  组件化  模块化
8. 移动端常用的开发技巧
flex弹性布局
css stickyfooter 布局
炫酷的交互设计

如何写简历

9. css用的是stylus
安装 npm install stylus
安装后还需要安装stylus-loader css-loader style-loader
npm install stylus-loader css-loader style-loader --save-dev
stylus中样式文件的后缀是styl

使用stylus写法上直观感受到的好处是在写子元素样式不用把父元素的样式名重复写
例如 .box .des .text{}在stylus里是嵌套的

在引入icon文字图标时报错，Uncaught Error: Cannot find module '../fonts/sell-icon.eot，
原来 woff2、eot、ttf、otf，在webpack中配置的是url-loader，然而在icon-font.scss中却写的是url，只要都改成url-loader就可以了

参考网址：https://www.jianshu.com/p/ec783a8ba1f8

-----------------

webpack配置

静态资源整合工具，是一个包，基于node.js

所有的配置目的都是为了把每个模块整合输出到一个文件，最后形成js\css\html\图片以供上线使用

其中分为开发环境和生产环境，有3个配置文件
webpack.dev.conf 开发环境
webpack.prod.conf 生产环境
webpack.base.conf是在开发环境和生产环境都会用到的


config文件夹里是基础配置，在打包的时候需要的属性值都在这个里边 



研究webpack的过程，把搜集到零碎的知识都记下来，不影响整个项目，等完成整个项目再回头整理。
这是对一个很难攻克不知是什么东西学习的一种思路。

https://juejin.im/post/5a531f4c6fb9a01cb80f926f 参考网站

https://blog.csdn.net/beichen3997/article/details/84324072?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522159193432619725250154064%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=159193432619725250154064&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v3~pc_rank_v2-1-84324072.first_rank_ecpm_v3_pc_rank_v2&utm_term=vue%E4%B8%ADconfig%E6%96%87%E4%BB%B6%E9%85%8D%E7%BD%AE


搭建工程化环境

------------------
知识体系

vue.js vue-router vuex

node.js

移动开发处理

每个知识点如何总结，需要掌握的有哪些？

整个项目从无到有，经历了怎样的过程？

有技术含量的地方是什么？如何体现这一点？

***图片的处理
1. icomoon 把svg格式的图标转化为图标字体
   在移动为了适配不同分辨率的手机，会使用两种大小的图片@2x.png和@3x.png
   网址：https://icomoon.io/ 
2. 在vue项目中可以不用把所有的图片都整合到一张画布上，因为webpack在打包的时候会对图片转化为64位流
   进行处理

***项目目录结构的设计
基于在打包的时候webpack会对项目中模块进行整合、优化、压缩，所以在目录结构设计时要考虑的是直观好找、易维护。
一般是就近原则，易于维护。

***数据
基于node的使用模拟数据

***best-scroll库实现滚动条效果
在使用的时候在请求数据后使用

***垂直居中实现
第一种方式 
父元素 display:table;
子元素 display:table-cell;
第二种方式，弹性盒布局 

***命名
组件名
样式名
事件名
变量名

***为一个DOM写CSS样式顺序
先位置 - 相对定位或者绝对定位
DOM元素本身的属性 - 大小 填充 圆角 行高 居中
DOM元素中文本节点 - 字体大小 颜色
最后DOM元素背景、影阴


------------------
每天都要回顾自己学习了多少，
评估对这个结果是否满意
如何改进，那些地方需要改进
下一步要如何做
下一步的计划是什么

---能用相对定位解决的就不用绝对定位解决
专业知识是硬基础

主要看做了什么？？？
美妙之处在于处理数据的逻辑~~
如何把这些联系起来~~~
值得思考~~

思路，完成每一个模块的思路，这是非常重要的硬实力

++++++++++++++++++++++
购物车列表中滚动条的实现，使用的是BScroll插件，
第一是如何使用

第二使用时用到的属性有哪些

第三就是结合vue操作DOM

第四在当前场景下使用时，条件是什么

第五从整体看这个问题，还有没有更好的解决办法

+++++++++++++++++++++++++
vue里操作DOM，根据数据控制是否显示购物车列表
1. 逻辑问题
2. 父组件和子组件vue实例周期钩子函数件的创建过程

++++++++++++++++++++++++
css技巧
使用width为100%和padding-top:100%,此时DOM是正方形，宽度和高度相同


++++++++++++++++++++++++++++++++++++++++++++++++++++++++
当下要做的~~下一步要做的~~结果

阻止事件冒泡  @click.stop
阻止事件默认行为  @click.prevent
事件只作用于元素本身，而不是子元素 @click.self
https://www.jianshu.com/p/73ace6422ea3  js里阻止事件冒泡参考

++++++++++++++++++++++++++++++++++++++++++++++++++++++++
完成小球运动

组件之间的嵌套使用
多级组件之间事件传递