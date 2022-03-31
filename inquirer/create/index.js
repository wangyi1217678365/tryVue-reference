const fsPromises = require('fs').promises
const path = require("path")
const childProcess = require("child_process")
const myRequest = require("../../utils/myRequest.js")
// const unzip = require("../../utils/unzip.js")
const inquirer = require("inquirer")
const {
  message,
  testNodeVersion
} = require('../../utils/index.js')
const { downloadFile } = require("../../utils/operationFile.js")

const createData = require('./inquirer_data.js')
// 获取用户选项
async function answer (datas) {
  const inqurerData = createData(datas)
  const layout = await inquirer.prompt(inqurerData.layout)
  const components = await inquirer.prompt(inqurerData.components)
  const views = await inquirer.prompt(inqurerData.views)
  const utils = await inquirer.prompt(inqurerData.utils)
  const themeSetting = await inquirer.prompt(inqurerData.themeSetting)
  const res = {
    layout: layout.layout === 'none' ? [] : [layout.layout],
    components: [...components.components],
    views: [...views.views],
    utils: [...utils.utils],
    themeSetting: [...themeSetting.themeSetting]
  }
  return res
}
// 检测目录
// 检测目录是否为空或是否已创建
async function testDir (options) {
  // 如果创建参数是 ".", 验证当前目录必须是空目录
  if (options === '.') {
    const promptList = [
      {
        type: "confirm",
        message: "Generate project in current directory?",
        name: "goOn"
      }
    ]
    //当前目录创建项目, 提示用户确认是否创建
    const goOn = await inquirer.prompt(promptList)
    if (!goOn.goOn) {
      process.exit(1)
    }
    const dir = await fsPromises.readdir(process.cwd())
    if (dir.length !== 0) {
      message('red', 'ERROR', ' The current directory is not empty!!!')
      process.exit(1)
    }
    return null
  } else {
    const projectDir = path.resolve(process.cwd(), options)
    // 判断目录是否存在
    try {
      // 目录已存在, 则抛出错误,退出程序
      await fsPromises.stat(projectDir)
      message('red', 'ERROR', ' directory already exists');
      process.exit(1)
    } catch (error) {
      return projectDir
    }
  }
}
async function inqCreate (options) {
  // 检测node版本是否符合要求
  if (!testNodeVersion()) {
    message('red', 'ERROR', 'node版本不能低于v12.0.0')
    process.exit(1)
  }
  // 检测目录是否合法
  const projectDir = await testDir(options)
  // 请求json文件
  let { data } = await myRequest("/fileserve/api/fireMonkeyCli/manifest")
  let datas = data.sourceListMap || {}
  // 等待用户的选择
  const res = await answer(datas)
  // 如果返回了项目目录,就创建这个目录
  if (projectDir) {
    await fsPromises.mkdir(projectDir)
    process.chdir(projectDir)
  }
  await downloadFile(data.zipPackageURL)
  // 初始化项目git
  await new Promise((resolve, reject) => {
    childProcess.exec('git init', error => {
      if (error) {
        reject()
        return
      }
      resolve()
    })
  })
  return res
}
module.exports = inqCreate