//报错时给用户更好提示的模块
var createError = require('http-errors');
//express框架
var express = require('express');
//nodejs自带的解析路径模块
var path = require('path');
//解析cookie模块
var cookieParser = require('cookie-parser');
//记录日志模块
var logger = require('morgan');
//express-session可以让更便捷的使用session
let session = require('express-session')


//引入路由
let userRouter = require('./routes/user')
let blogRouter = require('./routes/blog')

var app = express();

// 通过express-generator脚手架安装的express自带视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//记录日志中间件
app.use(logger('dev'));

//获取JSON格式的post data 中间件，将获取到的数据都放在 【req.body】
app.use(express.json());

//获取其他格式的post data 中间件，将获取到的数据也放在 【req.body】
app.use(express.urlencoded({extended: false}));

//解析cookie中间件
app.use(cookieParser());

//express开放静态文件访问服务，使public文件夹中的文件可以被访问
app.use(express.static(path.join(__dirname, 'public')));

/*
使用session中间件
1、使用该中间件之后会给首次访问服务的浏览器创建一个cookie，使得cookie与服务端变量里存储的session进行对应
2、在服务端存储session的对象（变量）里使用传给浏览器的cookie当做一个属性名，并且该属性名对应的属性值为一个空对象
3、使req.session对应该属性名，使得后续的操作可以对服务端存储session变量进行数据存储
*/
app.use(session({
        secret: 'JFLSKAJ908asdjklJ',//加密秘钥
        cookie: {
            // path: '/', //默认配置
            // httpOnly: true, //默认配置
            maxAge: 24 * 60 * 60 * 1000 //设置cookie的最大时间。与expires作用相同，但是设置的格式不太一样
        }
    }
))

//路由
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
