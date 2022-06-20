const env = process.env.NODE_ENV //环境参数---判断当前是开发环境还是生产环境

//配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {MYSQL_CONF}