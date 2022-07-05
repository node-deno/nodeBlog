//引入querystring——解析url的query参数
const querystring = require('querystring')

//引入路由
const handleUserRouter = require('./src/router/user')
const handleBlogrRouter = require('./src/router/blog')

//引入写日志模块
const {access} = require('./src/utils/log')


//SESSION_DATA用于存储session数据——在启动服务的时候会创建这个变量，之后所有的session数据都会放在这个对象里。（PS：1、这样无法控制session过期时间 2、如果服务重启，所有的session都会消失 3、用户多的时候会造成内存溢出）
const SESSION_DATA = {}

//程序运行次数
let runSum = 1


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

    //记录访问日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)


    console.log(`============${runSum++}============`)

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
        // console.log(req.cookie) // 看看传递过来cookie的每一项
    })
    if (process.env.NODE_ENV == 'debug') {
        console.log('cookie', req.cookie)
    }

    //解析session--先判断有没有userId，如果有的话看看SESSION_DATA中是否有此项，如果没有设为空对象；没有userId则随机生成任意的userId写在SESSION_DATA里
    let needSetCookieToSession = false //是否需要给前端设置cookie——用来存储userId，然后匹配后端存储的session
    let userId = req.cookie.userId
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookieToSession = true//是否需要给前端设置cookie
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]


    getPostData(req).then(postData => {
        req.body = postData
//        通过promise处理blog路由--- blogResult是一个promise，then里面的blogData 是上一级promise return 的内容
        const blogResult = handleBlogrRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {

                //如果需要前端的cookie对应服务端的session，需要向前端返回userId
                if (needSetCookieToSession) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;`)
                }

                res.end(JSON.stringify(blogData))
                return
            })
            return;
        }


//    通过promise处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {

                if (needSetCookieToSession) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;`)
                }
                console.log(SESSION_DATA)

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