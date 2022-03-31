const path = require('path')
const fsPromises = require('fs').promises
const { rmdirAsync } = require('./index.js')
const { startFileOperate } = require('./copy.js')
const { createOperationEffect } = require('./operationEffect.js')
const getAllTypesShuldCopyFiles = require('./getAllTypesShuldCopyFiles.js')
const unzip = require('./unzip.js')
const myRequest = require('./myRequest.js')

const downloadFile = async url => {
  const { data } = await myRequest(`/fileserve${url}`, null, 'get', { responseType: 'arraybuffer' })
  await fsPromises.writeFile('package.zip', data)
  await unzip('./package.zip')
  await rmdirAsync('./package.zip')
}

const copyFiles = async choiceInfo => {
  const aliasPath = path.resolve(process.cwd(), './pre')
  const allFiles = getAllTypesShuldCopyFiles(choiceInfo, aliasPath)
  await startFileOperate(allFiles)
  await createOperationEffect(choiceInfo, process.cwd())
  await rmdirAsync('./pre')
  return { code: 0, data: '创建成功!' }
}

module.exports = {
  copyFiles,
  downloadFile
}
