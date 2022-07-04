//GET请求接口之后，流式方法 pipe 返回data.txt文件中的内容
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let readStream = fs.createReadStream('./data.txt')
        readStream.pipe(res)
    }
})

server.listen(8000, (err) => {
    if (err) console.error(err)
    console.info('++++++++++++服务启动成功+++++++++++')
})