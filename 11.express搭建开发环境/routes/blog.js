const express = require('express')
const router = express.Router()

const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')


//获取博客列表
router.get('/list', function (req, res, next) {
    //获取query参数----在express中会自动分析URL上的参数并且自动放在req.query上
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    //如果前端传的query参数中包含 isadmin 那么说明要查询作者为该用户的博客列表
    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(new ErrorModel('未登录'))
            return
        }
        author = req.session.username
    }

    getList(author, keyword).then(data => {
        res.json(new SuccessModel(data))
    }).catch(err => {
        console.log(err)
    })
})

//获取博客详情
router.get('/detail', function (req, res, next) {
    getDetail(req.query.id).then(data => {
        res.json(new SuccessModel(data))
    })
})

//新建一篇博客


module.exports = router