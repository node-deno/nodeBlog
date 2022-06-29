const env = process.env.NODE_ENV //环境参数---判断当前是开发环境还是生产环境

// console.log('服务环境为：' + env)

//配置
let MYSQL_CONF;
let REDIS_CONF;


//MYSQL
MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'
}

//    Redis
REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}


if (env === 'dev') {
    //MYSQL
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }

//    Redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'debug') {
    //MYSQL
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }

    //    Redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {MYSQL_CONF, REDIS_CONF}

