function add(a, b) {
    return a + b
}

function mul(a, b) {
    return a * b
}

//一次导出一个函数
// module.exports = add

//一次多出多个函数需要借助对象
module.exports = {add, mul}