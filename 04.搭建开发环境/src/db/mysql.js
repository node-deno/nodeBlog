const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

//创建数据库连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接数据库
con.connect()

//统一执行sql的函数
function exec(sql) {

    //如果是调试模式，每次的SQL查询语句都输出
    if (process.env.NODE_ENV == 'debug') {
        console.log(sql)
    }

    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}


module.exports = {
    exec,
    escape: mysql.escape
}