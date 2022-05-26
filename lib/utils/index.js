// 工具函数
let class2type = {}
'Number String Boolean Array Object Date RegExp Error Function Null Undefined'
  .split(' ')
  .forEach(type => {
    class2type[`[object ${type}]`] = type.toLowerCase()
  })
/**
 *
 * @param {*} obj
 * @returns
 * 对象类型检测
 */
let type = function (obj) {
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)]
    : typeof obj
}
/**
 *
 * @param {*} obj
 * @returns
 * 判断是否是函数类型
 */
let isFunction = function (obj) {
  return type(obj) === 'function'
}
/**
 *
 * @param {*} source
 * @param {*} target
 * 混入
 */
let mixin = function (source, target) {
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      let fn = source[key]
      if (type(fn) === 'function') {
        target[key] = function wraped() {
          let args = [this.wraped, ...arguments]
          fn.apply(source, args)
        }
      } else {
        target[key] = fn
      }
    }
  }
}

// eslint-disable-next-line import/no-default-export
export { type, isFunction, mixin }
