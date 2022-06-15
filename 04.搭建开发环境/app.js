const serverHandle = (req, res) => {
//    设置返回格式——全部设置为JSON格式
    res.setHeader('Content-Type', 'application/json')

    const resData = {
        name: '爽约',
        site: '慕课网昵称',
        env:process.env.NODE_ENV
    }

    res.end(JSON.stringify(resData))
}

module.exports = serverHandle