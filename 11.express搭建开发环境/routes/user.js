var express = require('express')
var router = express.Router()

//这里的路由可以比作子路由，这样写的好处是可以与上层的重复路由进行分离
router.post('/login', function (req, res, next) {
    let {username, password} = req.body
    res.json({
        errno: 0,
        data: {
            username, password
        }
    })
})

module.exports = router