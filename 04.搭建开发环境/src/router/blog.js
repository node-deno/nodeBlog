const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

//    获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        //获取query参数
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
        let listData = getList(author, keyword)
        //返回使用SuccessModel固定格式的数据
        return new SuccessModel(listData)
    }

//    获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        let id = req.query.id || ''
        let data = getDetail(id)
        return new SuccessModel(data)
    }

//    新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
    }

//    更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }

//    删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter