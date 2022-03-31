const path = require('path')
const fs = require('fs')
const { makeSureDir } = require('./index.js')
const createOperationEffect = (choiceInfo, rootDir) => {
  const { layout = [], themeSetting = [], utils = [] } = choiceInfo
  const hasLayout = layout.length
  const hasThemeSetting = themeSetting.length
  const hasFilterRouter = utils.includes('filterRouter')
  makeSureDir(path.resolve(rootDir, './src/store/modules'))
  disposeEffect({ rootDir, hasLayout, hasThemeSetting, hasFilterRouter })
}

const disposeEffect = ({ rootDir, hasLayout, hasThemeSetting, hasFilterRouter}) => {
  const appComponetPath = path.resolve(rootDir, './src/App.vue')
  let appComponetContent = fs.readFileSync(appComponetPath).toString()
  appComponetContent = disposeLayout(hasLayout, appComponetContent)
  appComponetContent = disposeThemeSetting(rootDir, hasThemeSetting, appComponetContent)
  appComponetContent = deleteComment(appComponetContent)
  fs.writeFileSync(appComponetPath, appComponetContent)
  disposeFilterRouter(rootDir, hasFilterRouter)
  disposeVueConfig(rootDir, hasThemeSetting)
}

const disposeLayout = (hasLayout, appComponetContent) => {
  if (!hasLayout) {
    appComponetContent = appComponetContent.replace(/\n?\s*\/\* no delete start --layout \*\/[\S\s]+?\/\* no delete end --layout \*\//g, '')
    appComponetContent = appComponetContent.replace(/\<\!-- no delete start --layout  --\>[\S\s]+?\<\!-- no delete end --layout  --\>/g, '<router-view />')
  }
  return appComponetContent
}

const disposeThemeSetting = (rootDir, hasThemeSetting, appComponetContent) => {
  if (!hasThemeSetting) {
    appComponetContent = appComponetContent.replace(/\n?\s*\/\* no delete start --theme \*\/[\S\s]+?\/\* no delete end --theme \*\//g, '')
    fs.unlinkSync(path.resolve(rootDir, './webpack_theme_plugin.js'))
  }
  return appComponetContent
}

const disposeFilterRouter = (rootDir, hasFilterRouter) => {
  const routerConfigPath = path.resolve(rootDir, './src/router/index.js')
  let routerConfigContent = fs.readFileSync(routerConfigPath).toString()
  if (!hasFilterRouter) {
    routerConfigContent = routerConfigContent.replace(/\n?\s*\/\* no delete start --filterRouter \*\/[\S\s]+?\/\* no delete end --filterRouter \*\//g, '')
  }
  routerConfigContent = routerConfigContent.replace(/\/\* no delete start --filterRouter \*\/|\/\* no delete end --filterRouter \*\//g, '')
  routerConfigContent = routerConfigContent.replace(/(\n|\r){3}/g, '\n')
  fs.writeFileSync(routerConfigPath, routerConfigContent)
  return routerConfigContent
}

const disposeVueConfig = (rootDir, hasThemeSetting) => {
  const vueConfigPath = path.resolve(rootDir, './vue.config.js')
  let vueConfigContent = fs.readFileSync(vueConfigPath).toString()
  if (!hasThemeSetting) {
    vueConfigContent = vueConfigContent.replace(/\n?\s*\/\* no delete start --theme \*\/[\S\s]+?\/\* no delete end --theme \*\//g, '')
  }
  vueConfigContent = deleteComment(vueConfigContent)
  vueConfigContent = vueConfigContent.replace(/(\n|\r){3}/g, '\n')
  fs.writeFileSync(vueConfigPath, vueConfigContent)
  return vueConfigContent
}

const deleteComment = (code = '') => {
  code = code.replace(/\n?\s*\/\* no delete (start|end) --(layout|theme) \*\//g, '')
  code = code.replace(/\n?\s*<\!--[\s\S]*?--\>/g, '')
  return code
}

module.exports = {
  createOperationEffect,
}
