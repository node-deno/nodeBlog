let {exec} = require('../db/mysql')


const login = (username, password) => {
    let sql = `select username,realname from users where username='${username}' and password='${password}'`

    console.log(sql)
    return exec(sql).then(rows => {

        console.log(rows)

        return rows[0]
    })
}

module.exports = {
    login
}