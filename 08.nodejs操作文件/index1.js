//简单方式操作文件
const fs = require('fs')
const path = require('path') //主要用于处理不同系统中不同的路径方式

let fileName = path.resolve(__dirname, 'test.txt')

// //读取文件内容(异步)---此种方式存在缺陷，如果读取的文件大小是1G，那么data变量的大小也是1G，同理会占用1G的内存空间，从而可能导致内存溢出
// // fs.readFile('./test.txt', (err, data) => {
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
// //    data是二进制类型的，需要转化为字符串
//     console.log(data.toString())
// })
//
// //写入文件(异步)---类似于读取文件，可能会造成内存溢出
// let content = '这是新写入的内容\n'
// let opt = {
//     flag: 'a'  //追加写入。覆盖使用  w
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.error(err)
//     }
// })


//判断文件是否存在(异步)
fs.exists(fileName + '1', (exist) => {
    console.log('exist', exist) // 如果文件存在返回true，反之 false
})