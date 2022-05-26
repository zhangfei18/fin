// 构建线上包
const fs = require('fs')
const path = require('path')
const { rollup } = require('rollup')
// 创建dist目录
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}
let { getAllBuilds } = require('./config.js')
// 获取所有的配置项
let builds = getAllBuilds()
// console.log(builds)
// return
// 开始构建
build(builds)
function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built])
      .then(() => {
        built++
        if (built < total) {
          next()
        }
      })
      .catch(logError)
  }
  next()
}

function buildEntry(config) {
  const { output } = config
  const { file } = output
  // console.log(file)
  return rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      return write(file, code)
    })
}

function write(file, code) {
  return new Promise((resolve, reject) => {
    function report() {
      console.log(
        blue(path.relative(process.cwd(), file)) + ' ' + getSize(code)
      )
      resolve()
    }
    fs.writeFile(file, code, err => {
      if (err) return reject(err)
      report()
    })
  })
}
// 计算文件大小
function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function logError(err) {
  console.log(err)
}
