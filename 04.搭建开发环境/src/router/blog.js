const {getList, getDetail, newBlog} = require('../controller/blog')
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

        console.log('============')
        console.log(blogData)
        console.log('============')

        const data = newBlog(blogData)
        return new SuccessModel(data)
    }

//    更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }

//    删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter