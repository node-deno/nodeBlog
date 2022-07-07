const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
//首先监听是否有错误，如果存在错误输出错误内容
redisClient.on('error', err => {
    console.error('redis错误信息', err)
})

module.exports = redisClient