const http = require('http')

const server = http.createServer((req, res) => {

    if (req.method == 'POST') {
        //    查看前端传过来数据格式
        console.log('req content-type', req.headers['content-type'])
        //    接收前端传过来的数据
        let postData = ""
        //按照流的方式去接收post请求传递过来的数据
        req.on('data', result => {
            postData += result.toString()
        })
        req.on('end', () => {
            console.log('##########接收前端传递的数据完成##########')
            console.log(postData)
            //返回数据
            res.end('hello world!')
        })

    }

})

server.listen(8000, () => {
    console.log('===========服务器启动了===========')
})

console.log('OK')