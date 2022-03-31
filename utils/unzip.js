const compressing = require("compressing")
const path = require("path")

module.exports = async (filePath, unzipFile = "./", idDelFile = true) => {
  const curreentPath = path.resolve(process.cwd(), filePath)
  const result = await compressing.zip.uncompress(curreentPath, unzipFile)
  return result
}