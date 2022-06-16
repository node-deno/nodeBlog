const fs = require('fs')
const path = require('path')

/*//callback方式获取一个文件内容
function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.log(err)
        }
        callback(JSON.parse(data))
    })
}

//测试---使用回调函数处理异步会造成 callback-hell 回调地狱
getFileContent('a.json', aData => {
    console.log(aData)
    getFileContent(aData.next, bData => {
        console.log(bData)
        getFileContent(bData.next, cData => {
            console.log(cData)
        })
    })
})*/


//使用promise获取文件内容
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(JSON.parse(data))
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log(aData)
    return getFileContent(aData.next) //继续返回一个promise对象方便后续的链式调用
}).then(bData => {
    console.log(bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log(cData)
})













