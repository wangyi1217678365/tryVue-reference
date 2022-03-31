const fs = require('fs')
const path = require('path')
/**
 * 获取文件夹列表
 * @param { String } dPath 路径
 * @returns code 0-成功 -1失败，path 当前绝对路径，folderList --文件夹列表
 */
function getFolderList (dPath) {
  return new Promise(async (resolve, reject) => {
    try {
      let folderList = []
      process.chdir(dPath)
      const files = fs.readdirSync(dPath)
      let slash = dPath.substr(-1) === path.sep ? '' : path.sep
      for (let i = 0, len = files.length; i < len; i++) {
        let item = files[i]
        const isFile = await hasFolderStay(`${dPath}${slash}${item}`)
        isFile && folderList.push(item)
      }
      resolve({
        code: 0,
        path: path.resolve(dPath).split(path.sep).join('\\'),
        folderList
      })
    } catch (error) {
      resolve({
        code: -1,
        data: {},
        error
      })
    }
  })
}

/**
 * 检测路径是否文件夹
 * @param {String} path 
 * @returns 
 */
function hasFolderStay (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      resolve(err ? false : stats.isDirectory())
    })
  })
}

/**
 * 检测文件夹\文件是否存在
 * @param { String } dPath 路径
 * @returns status 是否文件夹
 */
function hasFolder (dPath) {
  return new Promise((resolve, reject) => {
    let { F_OK, R_OK } = fs.constants
    fs.access(dPath, F_OK | R_OK, function (err) {
      err ? resolve({ code: 0, status: false }) : resolve({ code: 0, status: true })
    })
  })
}
// 安装项目依赖
function installDependence (progressCb) {
  progressCb && progressCb("install start")
  return new Promise((resolve, reject) => {
    const exec = require('child_process').exec;
    const cmdStr = 'npm install';
    const installProgress = exec(cmdStr, (err, stdout) => {
      if (err){
        reject(err)
        
      } else {
        resolve()
      }
      progressCb && progressCb("install end")
    })
    installProgress.stderr.on('data',function (data) {
      progressCb && progressCb(data)
    });
  })
}
// 正式运行项目
function runServe (errorCb, cb, progressCb) {
  const exec = require('child_process').exec;
  const cmdStr = 'npm start';
  const installProgress = exec(cmdStr, (err, stdout, stderr) => {
    if (err){
      errorCb && errorCb(err)
    } else {
      cb && cb(stdout)
    }
  })
  installProgress.stdout.on('data', datas => {
    progressCb && progressCb(datas)
  })
  installProgress.stderr.on('data',function (data) {
    progressCb && progressCb(data)
  });
}
// 运行项目
function run (errorCb, cb, progressCb) {
  // 检查依赖是否安装
  hasFolder(path.resolve(process.cwd(), 'node_modules'))
    .then(res => {
      if (res.status) {
        // 运行项目
        runServe(errorCb, cb, progressCb)
      } else {
        // 安装依赖
        installDependence(progressCb)
          .then(() => {
            runServe(errorCb, cb, progressCb)
          }, err => {
            errorCb(err)
          })
      }
    })
}
module.exports = {
  getFolderList,
  hasFolder,
  run
}