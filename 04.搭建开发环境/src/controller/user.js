let {exec} = require('../db/mysql')


const login = (username, password) => {
    let sql = `select username,realname from users where username='${username}' and password='${password}'`

    return exec(sql).then(rows => {
        //如果在数据库中没有查询到会返回一个空数组，那么rows[0]的值就是undefined
        return rows[0]
    })
}

module.exports = {
    login
}