const path = require('path')
const webpack = require('webpack')
const del = require('del')
const genWebpackConfig = require('../lib/webpack-config')
const { groupMessage } = require('./shared')

function compile(options) {
  const { cwd = process.cwd(), mode = 'development' } = options
  const { watch = true, tryCatch } = options
  const buildDir = path.resolve(cwd, '.quickapp/build/*')
  return del([buildDir], { force: true }).then(() => {
    return new Promise(async (resolve, reject) => {
      let watcher = null
      let compiler
      let webpackConfig = await genWebpackConfig({
        cwd,
        mode,
        tryCatch,
        // IDE 中使用类似 serve 的处理, 以便 manifest.json 能动态应用编译模式
        isServe: watch,
      })
      function compileCallback(error, stats) {
        const message = groupMessage(stats)
        console.warn(message)
        resolve({ error, stats, watcher, compiler })
      }
      compiler = webpack(webpackConfig, compileCallback)
    })
  })
}

module.exports = compile
