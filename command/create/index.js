const { program } = require('commander')
const inqCreat = require('../../inquirer/create')
const { message } = require('../../utils/index.js')

const { copyFiles } = require("../../utils/operationFile.js")
const dirNameReg = new RegExp('^([A-Za-z0-9_-]+|\.)$')

program.command('create <dir>')
  .description('创建项目 命令：fireMonkey create <dir>')
  .action(async dir => {
    if (!(dirNameReg.test(dir))) {
      return message('red', 'ERROR', `文件名称不能是 "${dir}"`)
    }
    try {
      const choiceInfo = await inqCreat(dir)
      const res = await copyFiles(choiceInfo)
      if (res.code === 0) {
        message('green', 'success', `创建成功！\n`)
        dir === '.' ? null : message('green', `\tcd ${dir}`)
        message('green', `\tnpm install\n\tnpm run serve\n`)
      }
    } catch (error) {
      message('red', 'ERROR', `异常错误 "${error}"`)
    }

  })