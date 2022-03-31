const path = require('path')
const copy = require('./copy.js')

const copyTheme = async () => {
  const to = path.resolve(process.cwd(), './webpack_theme_plugin.js')
  const isExisted = await copy.isFileExisted(to) // true不存在，existed存在
  if (isExisted !== 'existed') {
    const from = path.resolve(process.cwd(), './.tmp/webpack_theme_plugin.js')
    await copy.copyFiles(from, to)
  }
}

module.exports = copyTheme