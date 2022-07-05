const fs = require('fs')
const path = require('path')

//写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n') // 写日志关键代码
}

//生成 write Stream
function createWriteStream(fileName) {
    let fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {flags: 'a'})
    return writeStream
}


//写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    //如果是dev环境，将日志输入access.log文件中；如果是debug环境，将日志直接输出在控制台上
    if (process.env.NODE_ENV === 'dev') {
        writeLog(accessWriteStream, log)
        return
    }
    console.info(log)
}


module.exports = {access}