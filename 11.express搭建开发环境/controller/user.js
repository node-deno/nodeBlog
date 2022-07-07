let {exec, escape} = require('../db/mysql')
let {genPassword} = require('../utils/crypto')


const login = (username, password) => {

    //防止xss 跨站脚本攻击
    password = genPassword(password)

    //防止sql注入攻击
    username = escape(username) //使用escape处理之后的内容会自动被 '' 引号包裹
    password = escape(password)


    let sql = `select username,realname from users where username=${username} and password=${password}`

    return exec(sql).then(rows => {
        //如果在数据库中没有查询到会返回一个空数组，那么rows[0]的值就是undefined
        return rows[0]
    })
}

module.exports = {
    login
}