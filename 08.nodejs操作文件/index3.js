//流式复制文件
const fs = require('fs')
const path = require('path')

let readStream = fs.createReadStream('./data.txt')
let writeStream = fs.createWriteStream('./data-back.txt')

//将读出的内容通过 pipe（管道） 写入到 该写的文件中
readStream.pipe(writeStream)

//读取结束的时候就表示文件拷贝成功了
readStream.on('close!!!', () => {
    console.log('文件拷贝成功')
})
