const {exec} = require('../db/mysql')

//在编写SQL的时候一定要注意空格，防止SQL语句在拼接之后不能正常使用
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 ` //写入 1=1 是为了防止author和keyword没有值，但是还有where会报错，加上 1=1 是SQL语法错误
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    //返回了一个promise
    return exec(sql)
}

//查询单个博客详情信息
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`

    return exec(sql).then(rows => {
        return rows[0]  // 执行SQL返回的都是数组，但是我们查询的是单个博客详情，所以要给浏览器端返回单个博客的详情对象
    })
}

//ES6新语法---如果blogData不存在则赋值空对象，做兼容处理
const newBlog = (blogData = {}) => {
//    blogData 是一个博客对象，包含 title content 属性
    console.log('newBlog blogData', blogData)
    let title = blogData.title
    let content = blogData.content
    let author = blogData.author
    let createTime = Date.now()
    const sql = `insert into blogs (title, content, createTime, author) values ('${title}','${content}','${createTime}','${author}' )`


    return exec(sql).then(insertData => {
        console.log('insertData', insertData)
        return {
            id: insertData.insertId
        }
    })

}

const updateBlog = (blogData = {}) => {
    console.log('updateBlog blogData', blogData)
    let title = blogData.title
    let content = blogData.content
    let id = blogData.id
    let sql = `update blogs set title='${title}' , content='${content}' where id=${id} `

    return exec(sql).then(updateData => {
        console.log('updateData', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (req) => {
    let id = req.id
    let author = req.author //删除博客的假数据
    let sql = `delete from blogs where id='${id}' and author='${author}' `
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}