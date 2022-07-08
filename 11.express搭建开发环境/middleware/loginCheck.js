const {ErrorModel} = require('../model/resModel')

//校验用户是否登录中间件
module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(new ErrorModel('未登录'))
}