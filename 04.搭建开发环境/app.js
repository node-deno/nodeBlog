//引入querystring——解析url的query参数
const querystring = require('querystring')

//引入路由
const handleUserRouter = require('./src/router/user')
const handleBlogrRouter = require('./src/router/blog')


//处理postData---由于postData是以stream的方式传递过来的，也就是接收postData是异步接收的
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


    //解析cookie
    const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3 cookie原本是这种样式的，使用起来不方便需要解析
    //做解析处理
    req.cookie = {}
    cookieStr.split(';').forEach(arrItem => {
        if (!arrItem) {
            return
        }
        const arr = arrItem.split('=')
        const key = arr[0].trim()  // trim()是去除空格
        const val = arr[1].trim()
        req.cookie[key] = val
        console.log(req.cookie)
    })
    console.log('cookie', req.cookie)


    //解析postData
    getPostData(req).then(postData => {
        req.body = postData

        // //    处理blog路由
        // const blogData = handleBlogrRouter(req, res)
        // if (blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }

//        通过promise处理blog路由--- blogResult是一个promise，then里面的blogData 是上一级promise return 的内容
        const blogResult = handleBlogrRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
                return
            })
            return;
        }


//    通过promise处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(userData => {
                res.end(JSON.stringify(userData))
                return
            })
            return;
        }


//    未命中路由，返回404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle