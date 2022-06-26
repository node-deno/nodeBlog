const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('toGMTString()', d.toGMTString())
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method

//    登录接口
    if (method === 'GET' && req.path === '/api/user/login') {
        let {username, password} = req.query

        return login(username, password).then(data => {
            if (data) {
                //操作cookie--返回给客户端
                res.setHeader('Set-Cookie', `username=${data.username};httpOnly;expires=${getCookieExpires()}`)
                return new SuccessModel(data)
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }


//    登录验证的测试接口---由于现在接口都是使用promise异步的方式，所以这里也需要使用promise进行修饰
    if (method === 'GET' && req.path === '/api/user/login-test') {
        //如果cookie里面没有username判定为登录失败
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({username: req.cookie.username}))
        }
        return Promise.resolve(new ErrorModel('登录失败'))
    }
}

module.exports = handleUserRouter
