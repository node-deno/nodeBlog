var express = require('express')
var router = express.Router()

//这里的路由可以比作子路由，这样写的好处是可以与上层的重复路由进行分离
router.get('/list', function (req, res, next) {
    //res.json---表示直接返回一个json格式的内容
    res.json({
        errno: 0,
        data: [1, 2, 3]
    })
})

router.get('/detail', function (req, res, next) {
    res.json({
        errno: 0,
        data: 'ok'
    })
})

module.exports = router