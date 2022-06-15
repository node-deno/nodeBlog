//通过普通的方式引入其他模块-------最后的 .js  可以不写，默认判定引入的是js文件
const otherModule = require('./a.js')

//通过解构赋值的方式引入其他模块中的方法
const {add, mul, reduce} = require('./a.js')
// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.end('hello word')
// })

//使用通过普通模式引入的第三方模块
console.log(otherModule.add(2, 3))
console.log(otherModule.mul(2, 3))
console.log('=====================')
//使用通过解构赋值模式引入的第三方模块
console.log(add(10, 15))
console.log(mul(10, 20))
