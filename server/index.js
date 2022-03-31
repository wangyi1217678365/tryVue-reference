const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')
const child_process = require('child_process')
const createWss = require('./wss')
const app = new Koa()

const host = '0.0.0.0'
let port = 3000

const createServer = () => {
  // 设置静态资源
  app.use(koaStatic(path.join(__dirname, '../views')))

  let server = app.listen(port, host, () => {
    console.log('项目启动 http://localhost:' + port)
    // 自动打开默认浏览器
    if (process.platform === 'darwin') { // mac环境
      child_process.exec('open http://localhost:' + port)
    } else {
      child_process.exec('start http://localhost:' + port)
    }
  })

  createWss(server)
}

// 判断端口是否被占用
const portIsOccupied = () => {
  const server = app.listen(port, host)

  server.on('listening', function () {
    server.close() // 关闭服务
    createServer()
  })

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') { // 端口已经被使用
      port = port + 1
      portIsOccupied()
    }
  })
}

module.exports = portIsOccupied