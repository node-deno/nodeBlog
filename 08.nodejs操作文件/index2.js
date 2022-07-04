//标准输入输出
// process.stdin.pipe(process.stdout)   //输入的内容nodejs会帮你输出出来
// pipe----相当于一个管道，是nodejs的一个全局方法，在任何位置都可以使用

//流式网络IO操作
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(res)  //相当于req 和 res 都为一个水桶，通过 pipe 这根管道进行两者之间的传递
    }
})

server.listen(8000, err => {
    console.log('========启动成功=======')
    console.error(err)
})