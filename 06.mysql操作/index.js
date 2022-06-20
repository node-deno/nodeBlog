const mysql = require('mysql')

//创建mysql连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'
})

//开始连接
con.connect()

//执行sql语句
// const sql = 'select * from users;' //查询语句
// const sql = `update users set realname='李四2' where username ='lisi'` //更新语句
const sql=`INSERT INTO  blogs(title,content,createtime,author) VALUES ('标题C','内容C',1655711299999,'lisi')`

con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

//关闭数据库连接——如果不关闭数据库连接会导致该线程始终被占用，导致node认为该js文件没有执行结束
con.end()