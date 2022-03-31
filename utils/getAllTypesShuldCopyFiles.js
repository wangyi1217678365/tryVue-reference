const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser').parse
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const fileDivisionSymbol = path.join('a', 'b').slice(1, -1)
const scriptInnerRegExp = /<script>([\s\S]+)?<\/script>/
const isPlainFile = fileName => /\.(html|vue|js|jsx|ts|tsx|css|less|sass|scss|stylus)$/.test(fileName)
const getRealPath = (dep, filePath, aliasPath) => dep[0] === '@' ? path.resolve(aliasPath, dep.replace(/@/, '.')) : path.resolve(filePath, dep)
const suffixs = ['.js', '.json', '.vue'].concat(['.js', '.json', '.vue'].map(item => `${fileDivisionSymbol}index${item}`))
const getFullReferencePath = (deps, filePath, aliasPath) => {
  return deps.map(dep => {
    if (/[a-zA-Z-_]\.\w+$/.test(dep)) return dep
    if (/^(\.{0,2}\/|@\/)/.test(dep)) {
      const realPath = getRealPath(dep, filePath, aliasPath)
      const suffix = suffixs.find(suffix => fs.existsSync(`${realPath}${suffix}`)) || ''
      return `${dep}${suffix.replace(fileDivisionSymbol, '/')}`
    } else {
      // console.log('npm install ', dep)
      return dep
    }
  })
}
const getDependency = (filePath, aliasPath) => {
  const deps = []
  if (!fs.existsSync(filePath)) return deps
  try {
    let code = fs.readFileSync(filePath).toString()
    if (/\.vue$/.test(filePath)) {
      const matcher = code.match(scriptInnerRegExp)
      matcher && (code = matcher[1])
    }
    const ast = parser(code, {
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      allowUndeclaredExports: true,
      errorRecovery: true,
      sourceType: 'module',
    })
    traverse(ast, {
      enter(path) {
        if (types.isImportDeclaration(path.node)) {
          deps.push(path.node.source.value)
        }
      }
    })
  } catch (error) {
    // console.log(error)
  }
  return getFullReferencePath(deps, filePath, aliasPath)
}

const getAttachedFiles = (input, allFiles, aliasPath) => {
  const { themeSetting = [], utils = [] } = input
  const attachedFiles = []
  themeSetting.length && attachedFiles.push(path.resolve(aliasPath, './store/modules/theme.js'))
  utils.includes('filterRouter') && attachedFiles.push(path.resolve(aliasPath, './store/modules/dynamicRoutes.js'))
  return attachedFiles.filter(item => !allFiles.has(item) && allFiles.add(item))
}

const getDepAbsolutePath = (filepath, aliasPath, depPath) => {
  if (depPath.startsWith('@/')) {
    return path.resolve(aliasPath + depPath.slice(1))
  }
  if (/\.{1,2}\//.test(depPath)) {
    return path.resolve(filepath, '../', depPath)
  }
}

const getFilePath = (rootPath, type, name, allFiles) => {
  let file = []
  const suffix = type === 'utils' ? 'js' : 'vue'
  const firstFilePath = path.resolve(`${rootPath}/${type}/${name}.${suffix}`)
  const secondFilePath = path.resolve(`${rootPath}/${type}/${name}/index.${suffix}`)
  file = fs.existsSync(firstFilePath) ? [firstFilePath] : (fs.existsSync(secondFilePath) ? [secondFilePath] : [])
  return file.filter(item => !allFiles.has(item) && allFiles.add(item))
}

const getShouldCopyFiles = (names, type, allFiles, aliasPath) => names.map(name => getFilePath(aliasPath, type, name, allFiles).flat())

const addDeepDependency = (absFiles, allFiles, aliasPath) => {
  const absDeps = [... new Set(absFiles.map(filePath => {
    const depStringList = getDependency(filePath, aliasPath)
    return depStringList.map(depString => getDepAbsolutePath(filePath, aliasPath, depString))
  }).flat(Infinity))]
  const newAbsDeps = absDeps.filter(item => !allFiles.has(item) && allFiles.add(item))
  newAbsDeps.length && addDeepDependency(newAbsDeps.filter(isPlainFile), allFiles)
}

const getAllTypesShuldCopyFiles = (input, aliasPath) => {
  const allFiles = new Set()
  const firstLayerFile = Object.entries(input).map(([type, names]) => getShouldCopyFiles(names, type, allFiles, aliasPath)).flat(Infinity)
  addDeepDependency(firstLayerFile, allFiles, aliasPath)
  const attachedFiles = getAttachedFiles(input, allFiles, aliasPath)
  addDeepDependency(attachedFiles, allFiles, aliasPath)
  return [... allFiles].filter(filePath => fs.existsSync(filePath) && fs.statSync(filePath).isFile())
}

module.exports = getAllTypesShuldCopyFiles
