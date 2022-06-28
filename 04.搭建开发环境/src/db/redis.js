const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
//首先监听是否有错误，如果存在错误输出错误内容
redisClient.on('error', err => {
    console.error('redis错误信息', err)
})

function set(key, val) {
    //因为redis存储的key和val都是字符串，则如果val是对象，需要给转化为JSON字符串
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(val)
                return
            }

            //如果key是redis不存在的值，则val是null
            if (val == null) {
                resolve(val)
                return
            }

            //如果val是一个对象，则尝试把对象字符串恢复为对象；如果不是对象，则直接返回
            try {
                resolve(JSON.stringify(val))
            } catch (ex) {
                resolve(val)
            }

        })
    })
    return promise
}

module.exports = {
    set, get
}