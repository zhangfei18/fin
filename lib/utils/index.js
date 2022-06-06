// 工具函数
let _fin
let class2type = {}
'Number String Boolean Array Object Date RegExp Error Function Null Undefined'
  .split(' ')
  .forEach(type => {
    class2type[`[object ${type}]`] = type.toLowerCase()
  })

let init = function (_Fin) {
  _fin = _Fin

  // 挂载链式处理函数
  _fin.chain = _chain

  // 挂载value函数
  _fin.prototype['value'] = function () {
    return this._wraped
  }
}
/**
 * 处理链式调用函数返回的结果
 * @param {*} ins: fin的示例
 * @param {*} obj: 要处理的数据经过上一个函数处理后的结果
 */
function chainResult(ins, obj) {
  // 如果ins上没有_chain属性，表示这个数据不需要采用链式调用，当然其经过函数处理后返回的结果obj也就不要支持链式调用了，所以直接
  // 返回obj即可
  if (ins._chain) {
    return _fin.chain(obj)
  } else {
    return obj
  }
}
function _chain(obj) {
  let instance = obj instanceof _fin ? obj : _fin(obj)
  instance._chain = true
  return instance
}
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
          let args = [this._wraped, ...arguments]
          return chainResult(this, fn.apply(source, args))
        }
      } else {
        target[key] = fn
      }
    }
  }
}

// eslint-disable-next-line import/no-default-export
export { init, type, isFunction, mixin, _chain, chainResult }
