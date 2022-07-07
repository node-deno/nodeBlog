//nodejs自身带有 crypto 加密库
const crypto = require('crypto')

//密钥
const SECRT_KEY = 'sads121sadsd'

//md5加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

//加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRT_KEY}`
    return md5(str)
}

module.exports = {genPassword}