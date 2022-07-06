const express = require('')
const htpp = require('http')

//本次http请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始。。。。', req.method, req.url)
    next()
})

app.use((req, res, next) => {
//    假设在处理cookie
    req.cookie = {userId: 'abc123'}
    next()
})

app.use((req, res, next) => {
//    假设处理post data
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
    })
    next()
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api 路由')
    next()
})