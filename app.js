var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
let db = require('./db/connection.js');

// 引入路
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置session
app.use(session({
	secret: 'keyboard',
	resave: true, 
	saveUninitialized: true
}))

// cors解决跨域
app.use("/",(res, req, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    req.header("Access-Control-Allow-Headers", "content-type");
    next();  
})

// 设置模板文件夹 view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 打印日志
app.use(logger('dev'));
// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 使用cookieParser中间件
app.use(cookieParser());
// 指定静态目录
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由
app.use('/', indexRouter);
app.use('/user', usersRouter);

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
