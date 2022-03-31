const path = require("path")
const fsPromises = require('fs').promises
const childProcess = require("child_process")
const { downloadFile } = require("../../utils/operationFile.js")
const { copyFiles } = require("../../utils/operationFile.js")

const createDir = async ({ rootDir, projectName }) => {
  const projectDir = path.join(rootDir, projectName)
  await fsPromises.mkdir(projectDir)
  process.chdir(projectDir)
}

const isValidGitRemoteAddress = gitRemoteAddress => {
  const sshAddressRegExp = /^\w+@\w+(\.\w+)+(:\w+)?(\/([\-\w\.]+))+\.git$/
  const httpAddressRegExp = /^https?:\/\/\w+(\.\w+)+\/([\w\-]+\/)+[\-\w\.]+\.git$/
  return sshAddressRegExp.test(gitRemoteAddress) || httpAddressRegExp.test(gitRemoteAddress)
}

const initGit = async gitRemoteAddress => {
  gitRemoteAddress = String(gitRemoteAddress).trim()
  const addRemoteCommandString = isValidGitRemoteAddress(gitRemoteAddress) ? ` && git remote add origin ${gitRemoteAddress}` : ''
  const commandString = `git init${addRemoteCommandString}`
  await new Promise((resolve, reject) => childProcess.exec(commandString, error => error ? reject(error) : resolve())).catch(error => console.log(error))
}

const createProject = async options => {
  const { layout = [], components = [], views = [], themeSetting = [], utils = [], zipPackageURL, Git, gitRemoteAddress = Git, path, rootDir = path, projectName } = options
  await createDir({ rootDir, projectName })
  await downloadFile(zipPackageURL)
  await initGit(gitRemoteAddress)
  return await copyFiles({ layout, components, views, themeSetting, utils })
}

module.exports = createProject
