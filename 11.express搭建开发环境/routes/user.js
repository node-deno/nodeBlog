var express = require('express')
var router = express.Router()
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')


//这里的路由可以比作子路由，这样写的好处是可以与上层的重复路由进行分离
router.post('/login', function (req, res, next) {
    let {username, password} = req.body
    login(username, password).then(data => {
        if (data) {
            //设置session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(new SuccessModel(data))
        } else {
            res.json(new ErrorModel('登录失败'))
        }
    })

})

//测试登录
router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            msg: '登录成功'
        })
    } else {
        res.json({
            msg: '登录失败'
        })
    }
})

/*
router.get('/session-test', (req, res, next) => {
    let session = req.session
    // res.json(session)
    if (session.viewnum == null) {
        session.viewnum = 0
    }
    session.viewnum++

    res.json({session, "viewnum": req.viewnum})
})
*/

module.exports = router