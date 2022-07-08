const http = require('http')
let slice = Array.prototype.slice

class LikeExpress {

    constructor() {
        //    存放中间件的列表
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    register(path) {
        let info = {}
        if (typeof path === 'string') {
            info.path = path
            //从第二个参数开始，转化为数组存入stack
            info.stack = slice.call(arguments, 1)  //数组
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        let info = this.register.apply(this, arguments)
        this.routes.all.push()
    }

    get() {
        let info = this.register.apply(this, arguments)
        this.routes.get.push()
    }

    post() {
        let info = this.register.apply(this, arguments)
        this.routes.post.push()
    }

    listen() {
    }
}

//工厂函数
module.exports = () => {
    return new LikeExpress()
}