const chalk = require('chalk')
const childProcess = require('child_process')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto');
const fsp = fs.promises
const { message } = require('./index')

/**
 * 
 * @param {*} from 源文件/文件夹 位置
 * @param {*} to 目的位置,目的位置的文件夹不能出现多级为空情况
 * @param {*} fn 回调函数
 */
function copyDirs (from, to, fn) {
  return new Promise(async (resolve, reject) => {
    const dirPath = path.dirname(to)
    await fsp.mkdir(dirPath, { recursive: true })// copy前先把目的地的父目录创建完成，
    childProcess.exec(`cp -r ${from} ${to}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行出错：${error} `);
        reject(error)
        return
      }
      fn && fn()
      resolve()
    });
  })
}

/**
 * from和to，都是文件级别的单文件操作,且确保源文件存在，目标文件不冲突；
 * @param {*} from 
 * @param {*} to 
 */
async function copyFiles (from, to) {
  const dirPath = path.dirname(to)
  await fsp.mkdir(dirPath, { recursive: true })
  fs.writeFileSync(to, fs.readFileSync(from));
  return Promise.resolve('suc')
  // const rs = fs.createReadStream(from);
  // try {
  //   const ws = fs.createWriteStream(to);
  //   rs.pipe(ws);
  //   ws.on('close', function () {
  //     // console.log('copy end!')
  //     return Promise.resolve('suc')
  //   })
  //   rs.on('end', function () {
  //     ws.end()
  //   })
  // } catch (error) {
  //   return Promise.reject(error)
  // }
}

// 依据源目录推断目的path,检查，再后续copy操作
async function startFileOperate (fileLists, type) {
  const fileMap = createTargetMap(fileLists, type)
  const [isConflitct] = await calcConflict(fileMap, type)
  // console.log('目录查找结束：', isConflitct, fileMap)
  if (!isConflitct) {
    const result = await Promise.all(fileMap.map(async ([from, to]) => {
      // console.log('copy:', from, to)
      return await copyFiles(from, to)
    }))
    return Promise.resolve('suc')
  }
  return Promise.reject('failed:操作失败！')
}

function createTargetMap (fileLists, type) {
  const prePath = process.cwd()
  return fileLists.map(item => {
    item = path.resolve(item)
    // console.log(path.sep)
    const from = item.replace(prePath + `${path.sep}`, '')
    const sourcePre = type === 'add' ? `.tmp${path.sep}pre` : 'pre'
    let to = from.replace(sourcePre, 'src')
    // 引用layout的入口文件，映射规则单独处理：pre/layout/App.vue -> src/App.vue
    // if (from.includes('\\layout\\App.vue')) {
    //   to = to.replace('\\layout', '')
    // }
    return [from, to]
  })
}
/**
 * 分析源文件和目标文件冲突
 * @param {*} fileMap 
 * @param {*} type 
 */
async function calcConflict (fileMap, type) {
  let isConflitct = false
  const result = await Promise.all(fileMap.map(async ([from, to]) => {
    const toExist = await isFileExisted(to)
    if (toExist === 'existed') {
      // create时，引用layout的入口文件可以直接覆盖，不考虑冲突：？
      const ifIgnore = type !== 'add' ? !(from.includes(`pre${path.sep}App.vue`)) : true
      if (!isSameFile(from, to) && ifIgnore) {
        // if (!isSameFile(from, to)) {
        isConflitct = true
        message('red', '已存在同名文件且内容有冲突', `文件"${to}"`)
        // console.log('已存在同名文件且内容有冲突！', to)
        return (`file existed:${to}`)
      }
    }
  }))
  return [isConflitct]
}

// 比对文件内容是否变更，md5
// win certutil -hashfile package.json MD5
// linux md5sum 51mn.txt 
function isSameFile (from, to) {
  return getMd5(from) === getMd5(to) ? true : false
}
function getMd5 (p) {
  var str = fs.readFileSync(p, 'utf-8');
  var md5um = crypto.createHash('md5');
  md5um.update(str);
  return md5um.digest('hex');
}

function isFileExisted (target) {
  return new Promise(function (resolve, reject) {
    fs.access(target, (err) => {
      if (err) {
        resolve(true)
      } else {
        resolve('existed');
      }
    })
  })
}

module.exports = {
  copyDirs,
  copyFiles,
  startFileOperate,
  isFileExisted
}