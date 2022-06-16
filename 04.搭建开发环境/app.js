//引入querystring——解析url的query参数
const querystring = require('querystring')

//引入路由
const handleUserRouter = require('./src/router/user')
const handleBlogrRouter = require('./src/router/blog')


//处理postData
const getPostData = (req) => {
    const promise = new Promise(((resolve, reject) => {
        //不是POST请求
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        //如果前端传过来的不是JSON，直接解析空对象
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }

        let postData = ''
        req.on('data', data => {
            postData += data.toString()
        })
        req.on('end', () => {
            //如果postData没有数据，直接解析空对象
            if (!postData) {
                resolve({})
            }
            resolve(JSON.parse(postData))
        })
    }))
    return promise
}


const serverHandle = (req, res) => {
//    设置返回格式——全部设置为JSON格式
    res.setHeader('Content-Type', 'application/json')

    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析postData
    getPostData(req).then(postData => {
        req.body = postData

        //    处理blog路由
        const blogData = handleBlogrRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }

//    处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }

//    未命中路由，返回404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle