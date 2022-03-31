const fsPromises = require('fs').promises
const path = require("path")
const { message, testNodeVersion } = require('../../utils/index.js')
const myRequest = require("../../utils/myRequest.js")
const { downloadFile } = require("../../utils/operationFile.js")

async function inqAdd (options) {
  // 检测node版本
  if (!testNodeVersion()) {
    message('red', 'ERROR', 'node版本不能低于v12.0.0')
    process.exit(1)
  }
  let { data } = await myRequest("/fileserve/api/fireMonkeyCli/manifest")
  const filePath = data.zipPackageURL
  
  let datas = {
    // 测试用数据
    // components: [ 'Crumbs', 'Head', 'Menu', 'Search', 'Table', 'Test' ],
    // layout: [ 'layout' ],
    // views: [ 'login', 'table' ],
    // utils: [ 'download', 'print', 'tool', 'upload' ]
  }
  datas = data.sourceListMap
  let res = {}
  // 存储用户输入的不存在的数据
  const notFound = {}
  let isError = false
  for (let key in datas) {
    // 去重
    const optionsItemList = Array.from(new Set(options[key]))
    const datasItemList = datas[key]
    // 找在data中存在的值
    res[key] = []
    optionsItemList.forEach(item => {
      let d = null
      datasItemList && datasItemList.find(datasItem => {
        // 不区分大小写, 且推入结果的应该是来于 datasItemList 中的数据
        if (datasItem.toLowerCase() === item.toLowerCase()) {
          d = datasItem
          return true
        }
        return false
      })
      if (d) {
        // 存在的组件,推入res[key]的数组中
        res[key].push(d)
      } else {
        // 如果出现不存在的结果则推入错误的数据中, 用于后面提示
        isError = true
        notFound[key] ? notFound[key].push(item) : notFound[key] = [item]
      }
    })
  }
  if (isError) {
    for (let key in notFound) {
      message('red', 'ERROR', `Components not found -- ${key}:[${notFound[key].join(', ')}]`)
    }
    process.exit(1)
  }
  try {
    const tmpPath = path.resolve(process.cwd(), "./.tmp")
    await fsPromises.mkdir(tmpPath)
  } catch (error) {
    throw "创建目录异常"
  }
  await downloadFile(filePath)
  return res
}

module.exports = inqAdd
