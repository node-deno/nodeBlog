const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method

//    登录接口
    if (method === 'GET' && req.path === '/api/user/login') {
        let {username, password} = req.query

        return login(username, password).then(data => {
            if (data) {

                // //操作cookie--返回给客户端
                // res.setHeader('Set-Cookie', `username=${data.username};httpOnly;expires=${getCookieExpires()}`)

                //设置session
                req.session.username = data.username
                req.session.realname = data.realname

                console.log('session', req.session)
                // console.log('req', req)

                return new SuccessModel(data)
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }


//    登录验证的测试接口---由于现在接口都是使用promise异步的方式，所以这里也需要使用promise进行修饰
    if (method === 'GET' && req.path === '/api/user/login-test') {
        //如果cookie里面没有username判定为登录失败

        // console.log('req', req)
        console.log('session', req.session)
        console.log('cookie', req.cookie)

        if (req.session.username) {
            return Promise.resolve(new SuccessModel({username: req.session.username}))
        }
        return Promise.resolve(new ErrorModel('登录失败'))
    }
}

module.exports = handleUserRouter
