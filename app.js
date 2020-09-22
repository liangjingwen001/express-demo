var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
let db = require('./db/connection.js');	//连接数据库
const bodyParser = require('body-parser')	//设置post请求发送数据的最大值
let cors = require('cors')	//解决跨域
let utils = require('./utils/utils.js')
let fs = require('fs')

var app = express();


// 设置session
app.use(session({
	secret: 'keyboard',
	resave: true, 
	saveUninitialized: true
}))

// post请求默认最大传送100kb
app.use(bodyParser.json({limit : "1000kb"}));

// 中间件解决跨域(1)
app.use(cors())

// cors解决跨域(2)
// app.use("/",(res, req, next) => {
// 	req.header("Access-Control-Allow-Origin", "*");
// 	req.header("Access-Control-Allow-Methods", "GET,POST,PUT");
// 	req.header("Access-Control-Allow-Headers", "content-type");
//     next();  
// })

// 设置模板文件夹 view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 打印日志
app.use(logger('dev'));

logger.token('requestParameters', function(req, res){
  return JSON.stringify(req.query) || '-';
});
logger.token('requestBody', function(req, res){
  return JSON.stringify(req.body) || '-';
});
let accessLog = fs.createWriteStream('./access.log', {flags : 'a'});
logger.format('接口日志', '[接口日志] :method :url :status :requestParameters :requestBody :response-time ms');
app.use(logger('接口日志', {stream : accessLog}));

// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 使用cookieParser中间件
app.use(cookieParser());

// 指定静态目录
app.use(express.static(path.join(__dirname, 'public')));

// 引入路
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
// 使用路由
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/news', (req, res, next) => {
	// let {token} = req.method === 'POST' ? req.body : req.query;
	let {token} = req.headers;
	if (token) {
		utils.checkToken(token)
		.then((data) => {
			next();
		})
		.catch((err) => {
			res.send(err)
		})
	} else {
		res.send({code: 401, msg: '缺少token'})
	}
}, newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
