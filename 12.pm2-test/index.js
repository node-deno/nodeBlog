let http = require('http')

let server = http.createServer((req, res) => {

    //模拟日志
    console.log('我是模拟日志信息',Date.now())
    //模拟错误
    console.error('我是模拟日志错误',Date.now())

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        errno: 0,
        msg: 'pm2 测试2'
    }))
})

server.listen(8000)
console.log('========服务已启动========')