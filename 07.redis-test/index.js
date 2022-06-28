const redis = require('redis')

//创建redis客户端
let redisClient = redis.createClient(6379, '127.0.0.1')
//监控redis是否有错误
redisClient.on('error', err => {
    console.log(err)
})


//测试
redisClient.set('myname', 'zhangsan', redis.print)
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('val', val)

//    退出redis
    redisClient.quit()
})