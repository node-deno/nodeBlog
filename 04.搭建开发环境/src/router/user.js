const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method

//    登录接口
    if (method === 'POST' && req.path === '/api/user/login') {
        let {username, password} = req.body
        let result = login(username, password)
        if (result) {
            return new SuccessModel('登录成功')
        } else {
            return new ErrorModel('用户名或密码不正确')
        }
    }
}

module.exports = handleUserRouter
