const { program } = require('commander')
const createServer = require('../../server')
const {
  message,
  testNodeVersion
} = require('../../utils/index')

program.command('ui')
  .description('可视化页面创建项目 命令：fireMonkey ui')
  .action(async () => {
    if (!testNodeVersion()) {
      message('red', 'ERROR', 'node版本不能低于v12.0.0')
      process.exit(1)
    }
    createServer()
  })