const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {

    let method = req.method
    let url = req.url
    let path = url.split('?')[0]
    let query = querystring.parse(url.split('?')[1])

//    设置返回的数据格式  JSON
    res.setHeader('Content-type', 'application/json')

//    返回时
    const resData = {
        method,
        url,
        path,
        query,
    }

    //返回GET请求
    if (method == 'GET') {
        console.log('返回GET请求')
        res.end(JSON.stringify(resData))
    }
    //返回POST请求
    if (method == 'POST') {
        let postData = ''
        req.on('data', result => {
            postData += result.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
    }

})

server.listen(8000, () => {
    console.log('服务启动了')
})