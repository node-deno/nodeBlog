const http = require('http')

const server = http.createServer((req, res) => {
    res.end('hello world')
})

server.listen(8000, () => {
    console.log('===========服务器启动了===========')
})