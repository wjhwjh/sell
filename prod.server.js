/*
根据之前了解过的总结
1. node可用于写后台，前端的后台语言
2. vue项目打包以后的只是静态的页面，无法正常运行，需要写一个服务器，处理请求的数据等

目前体会到的
1. 这里使用node中的express模块，简单的写了一个服务器
2. 这里的逻辑是什么？ 征途的思路是什么？

将要继续了解的
1. 于是就有服务器端和客户端的传输方式？？？？？？？ https和http的请求的区别
2. 是否继续研究node
3. 对vue的掌握和webpack的再次回顾
4. 继续视频

*/
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port || 8089;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/sellers', function (req, res) {
	res.json({
		errno: 0,
		data: seller
	});
});

apiRoutes.get('/goods', function (req, res) {
	res.json({
		errno: 0,
		data: goods
	});
});

apiRoutes.get('/ratings', function (req, res) {
	res.json({
		errno: 0,
		data: ratings
	});
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});