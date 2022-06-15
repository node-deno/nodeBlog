const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {

    //如果请求ico图标，直接返回
    if (req.url == '/favicon.ico') {
        return;
    }

    //获取请求的方式
    console.log(req.method)
    //获取完整的URL
    let url = req.url
    console.log(url)
    //解析querystring---借助querystring模块将浏览器传回来的参数解析为JSON字符串
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.query)
    //将querystring返回
    res.end(JSON.stringify(req.query))
})

server.listen(8000, () => {
    console.log('===========服务器启动了===========')
})