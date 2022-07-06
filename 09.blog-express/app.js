var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup 配置视图引擎的设置---注释之后可以删除view文件夹了
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//使用morgan日志
app.use(logger('dev'));

//如果有请求传入JSON格式的params参数，将参数绑定在req.body上
app.use(express.json());

//如果有请求传入其他格式的params参数，将参数绑定在req.body上
app.use(express.urlencoded({extended: false}));

//解析cookie参数，将参数绑定在req.cookies上
app.use(cookieParser());

// //使public目录的静态文件可以被访问---注释之后可以删除public文件夹了
// app.use(express.static(path.join(__dirname, 'public')));

//设置路由——1、从前到后依次进入，如果前边的已经匹配成功则进入继续匹配，如果匹配不成功再匹配下一个。2、进入indexRouter后的的与该路由进行拼接
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
