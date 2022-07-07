//报错时给用户更好提示的模块
var createError = require('http-errors');

var express = require('express');

//nodejs自带的解析路径模块
var path = require('path');

//解析cookie模块
var cookieParser = require('cookie-parser');

//记录日志模块
var logger = require('morgan');

//路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
let userRouter = require('./routes/user')
let blogRouter = require('./routes/blog')

var app = express();

// 通过express-generator脚手架安装的express自带视图引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//记录日志中间件
app.use(logger('dev'));

//获取JSON格式的post data 中间件，将获取到的数据都放在 【req.body】
app.use(express.json());

//获取其他格式的post data 中间件，将获取到的数据也放在 【req.body】
app.use(express.urlencoded({extended: false}));

//解析cookie中间件
app.use(cookieParser());

// 使public目录的静态文件可以被访问---注释之后可以删除public文件夹了
//express开放静态文件访问服务，使public文件夹中的文件可以被访问
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// 如果路由都没有匹配到执行此中间件，给用户返回404
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误异常处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
