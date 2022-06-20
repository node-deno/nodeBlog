const getList = (author, keyword) => {
//    先返回假数据
    return [
        {id: 1, title: '标题1', content: '内容1', createTime: '1655348313267', author: '张三'},
        {id: 2, title: '标题2', content: '内容2', createTime: '1655348319299', author: '李四'},
    ]
}

const getDetail = (id) => {
    return {id: 1, title: '标题1', content: '内容1', createTime: '1655348313267', author: '张三'}
}

//ES6新语法---如果blogData不存在则赋值空对象，做兼容处理
const newBlog = (blogData = {}) => {
//    blogData 是一个博客对象，包含 title content 属性
    console.log('newBlog blogData', blogData)
    return {
        id: 3//表示新建博客插入数据表里的数据--id
    }
}

const updateBlog = (blogData = {}) => {
    console.log('updateBlog blogData', blogData)
    return true
}

const deleteBlog = (id) => {
//    id就是要删除博客的id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}