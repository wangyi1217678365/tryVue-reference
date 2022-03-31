const chalk = require('chalk')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline');

function message (color, type, concent) {
  concent = concent ? `: ${concent}` : ''
  console.log(chalk[color](type) + concent)
}
function delDir (dirPath, fn) { // 删除目录：通过命令行方式
  childProcess.exec('rm -r ' + dirPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    fn && fn()
    // console.log(`stdout: ${stdout}`);
    // console.error(`stderr: ${stderr}`);
  })
}

async function rmdirAsync (filePath) {  // 删除目录：node fs递归删除
  const fsPromises = fs.promises // 异步文件系统方法，返回promise对象
  let stat = await fsPromises.stat(filePath) // 获取文件信息
  if (stat.isFile()) { // 判断是否是文件
    await fsPromises.unlink(filePath) // 异步删除文件
  } else {
    let dirs = await fsPromises.readdir(filePath) // 读取目录的内容，然后返回 Promise 并带上一个数组（包含目录中的文件的名称，但不包括 '.' 和 '..'）
    dirs = dirs.map(dir => rmdirAsync(path.join(filePath, dir)))
    await Promise.all(dirs)
    await fsPromises.rmdir(filePath)
  }
}
const exeCMD = async cmdText => {
  return await new Promise((resolve, reject) => {
    childProcess.exec(cmdText, error => {
      error ? reject(error) : resolve()
    })
  })
}
// 同行输出文本
function outSameLine (str) {
  //删除光标所在行
  readline.clearLine(process.stdout, 0)
  //移动光标到行首
  readline.cursorTo(process.stdout, 0)
  process.stdout.write(str, 'utf-8')
}

const makeSureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
  return dirPath
}
/**
 * 检测node版本
 * @param {string} limit 限制版本
 * @returns {boolean} result 是否符合当前版本要求
 */
const testNodeVersion = function (limit = 'v12.0.0') {
  const cVersion = process.version.match(/\d+/g).map(item => item.padStart(3, '0'))
  const limitVersion = limit.match(/\d+/g).map(item => item.padStart(3, '0'))
  const c = parseInt(cVersion.join(''))
  const l = parseInt(limitVersion.join(''))
  return c > l ? true : false
}

module.exports = {
  message,
  delDir,
  rmdirAsync,
  exeCMD,
  outSameLine,
  makeSureDir,
  testNodeVersion
}