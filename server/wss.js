const ws = require('ws')
const path = require('path')
const utils = require('./utils')
const createProject = require('../inquirer/ui/index')

const createWss = (server) => {
  const wss = new ws.Server({ server, path: '/graphic' })
  wss.on('connection', function connection (ws) {
    ws.on('message', async function incoming (message) {
      if (message) {
        message = JSON.parse(message)
      }
      if (!message || !message.type) return
      let resultData = {
        type: message.type,
        dirname: path.resolve()
      }
      if (message.path) {
        message.path = message.path.split('\\').join(path.sep)
      }
      switch (message.type) {
        case 'getFolderList':
          resultData.data = await utils.getFolderList(message.path)
          break
        case 'hasFolder':
          resultData.data = await utils.hasFolder(message.path)
          break
        case 'createProject':
          let obj = message.data
          obj.path = obj.path.split('\\').join(path.sep)
          resultData.data = await createProject(obj)
          break
        case 'run':
          utils.run(err => {
            resultData.data = {
              code: -1,
              error: err.toString()
            }
            ws.send(JSON.stringify(resultData))
          }, datas => {
            // 运行完毕
            resultData.data = {
              code: 0,
              data: datas
            }
            ws.send(JSON.stringify(resultData))
          }, progress => {
            // 运行进度
            resultData.data = {
              code: 0,
              data: progress
            }
            ws.send(JSON.stringify(resultData))
          })
          return
      }
      ws.send(JSON.stringify(resultData))
    })

    // 监听全局错误
    process.on('uncaughtException', function (error) {
      console.log('error信息：：：：：', error)
      ws.send(JSON.stringify({
        type: 'error',
        data: {
          code: -1,
          message: '??????????????',
          error: error.toString()
        }
      }))
    })
  })
}

module.exports = createWss