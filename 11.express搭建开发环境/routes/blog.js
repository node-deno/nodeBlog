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
        console.log('管理员界面')
        if (req.session.username == null) {
            console.error('管理员界面，但是没有登录')
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
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    newBlog(req.body).then(data => {
        res.json(new SuccessModel(data))
    })
})

//更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
    req.body.id = req.query.id
    updateBlog(req.body).then(data => {
        if (data) res.json(new SuccessModel('更新成功'))
        else res.json(new ErrorModel('更新失败'))
    })
})

//删除一篇博客
router.post('/del', loginCheck, (req, res, next) => {
    req.body.id = req.query.id
    req.body.author = req.session.username
    deleteBlog(req.body).then(data => {
        if (data) res.json(new SuccessModel('删除成功'))
        else res.json(new ErrorModel('删除失败'))
    })
})

module.exports = router