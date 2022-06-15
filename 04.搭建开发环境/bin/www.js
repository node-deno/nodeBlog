const http = require('http')

const PORT = 8000

//引入
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
    console.log("===========服务启动成功===========")
})