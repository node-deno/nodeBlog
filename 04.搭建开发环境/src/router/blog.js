const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

//    获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        //获取query参数
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''

        // let listData = getList(author, keyword)
        // //返回使用SuccessModel固定格式的数据
        // return new SuccessModel(listData)


        //由于与数据库交互是异步进行的，所以也要通过异步的方法调用controller提供过来的方法——return 返回本身是为了可以链式调用
        return getList(author, keyword).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            console.log(err)
        })
    }

//    获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // let id = req.query.id || ''
        // let data = getDetail(id)
        // return new SuccessModel(data)

        let id = req.query.id || ''
        return getDetail(id).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            console.log(err)
        })
    }

//    新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        //先使用假数据代替author
        blogData.author = 'zhangsan'

        return newBlog(blogData).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            console.log(err)
        })
    }

//    更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return updateBlog(req.body).then(res => {
            if (res) {
                return new SuccessModel('更新博客成功')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

//    删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return deleteBlog(req.body).then(res => {
            if (res) {
                return new SuccessModel('删除博客成功')
            } else {
                return new ErrorModel()
            }
        })
    }
}

module.exports = handleBlogRouter