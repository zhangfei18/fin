// 打包工具配置项文件
const path = require('path')
const strip = require('@rollup/plugin-strip')
const clear = require('rollup-plugin-clear')
// console.log(process.env)
const version = require('../package.json').version
const banner =
  '/*!\n' +
  ` * fin函数库 v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} zhangfei@baidu.com\n` +
  ' */'
const resolve = function (p) {
  return path.resolve(__dirname, p)
}
const builds = {
  commonJs: {
    entry: resolve('../lib/index.js'),
    dest: resolve('../dist/fin.common.js'),
    format: 'cjs',
    banner,
    exports: 'auto',
  },
  esModule: {
    entry: resolve('../lib/index.js'),
    dest: resolve('../dist/fin.es.js'),
    format: 'es',
    banner,
  },
  IIFE: {
    entry: resolve('../lib/index.js'),
    dest: resolve('../dist/fin.js'),
    format: 'iife',
    name: "fin",
    banner,
  },
}

/**
 *
 * @param {*} name
 * 该函数用于将上面的builds转换成可供rollup接收的配置项
 */
function getConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    plugins: [

    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
    },
  }
  if (opts.exports) {
    config.output.exports = opts.exports
  }
  if (opts.name) {
    config.output.name = opts.name
  }
  // 生产环境删除debugger和log
  if (process.env.NODE_ENV === 'production') {
    config.plugins = (config.plugins || []).concat(strip())
  }
  return config
}
let target = process.env.TARGET
if (target) {
  module.exports = getConfig(target)
} else {
  exports.getAllBuilds = () => Object.keys(builds).map(getConfig)
}
