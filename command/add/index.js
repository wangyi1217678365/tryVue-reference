const { program } = require('commander')
const path = require('path')
const fs = require('fs')
const inqAdd = require('../../inquirer/add')
const { rmdirAsync, message } = require('../../utils/index.js')
const { startFileOperate } = require('../../utils/copy')
const getAllTypesShuldCopyFiles = require('../../utils/getAllTypesShuldCopyFiles.js')
const copyTheme = require('../../utils/copyTheme.js')

program
  .command('add')
  .option('-p, --views <name...>', '新增页面多个页面空格隔开, 可添加页面table, login')
  .option('-c, --components <name...>', '新增组件多个组件空格隔开, 可添加组件Crumbs, Head, Menu, Search, Table')
  .option('-u, --utils <name...>', '新增项目里所需方法, 可添加方法download, print, tool, upload')
  .option('--layout <name...>', '新增项目里所需布局, 可添加布局layout')
  .option('--theme [name...]', '新增主题切换模式, 可添加主题切换方法ThemeSetting')
  .description('添加 命令: fireMonkey add <option> <name...>')
  .action(async options => {
    if (options.theme) {
      options.themeSetting = ['ThemeSetting']
      delete options.theme
    }
    try {
      const choiceInfo = await inqAdd(options)
      const aliasPath = path.resolve(process.cwd(), `./.tmp/pre`)
      const allFiles = getAllTypesShuldCopyFiles(choiceInfo, aliasPath)
      await startFileOperate(allFiles, 'add')
      if (options.themeSetting) copyTheme()
      await rmdirAsync('./.tmp')
      message('green', 'success', `创建成功！`)
    } catch (error) {
      if (fs.existsSync('./.tmp')) {
        await rmdirAsync('./.tmp')
      }
      message('red', 'ERROR', `异常错误 "${error}"`)
    }
  })
