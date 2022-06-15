const http = require('http')

const server = http.createServer((req, res) => {
    let url = req.url
    let path = url.split('?')[0]
    res.end(path)
})

server.listen(8000, () => {
    console.log('~~~~~~~~~~服务器启动成功~~~~~~~~~~')
})