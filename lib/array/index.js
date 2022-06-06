import { chainResult } from '../utils/index.js'
let _fin
let ArrayProto = Array.prototype

function init(_Fin) {
  _fin = _Fin
  ;['pop', 'push', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(
    name => {
      // 保存原始的方法
      let method = ArrayProto[name]
      _fin.prototype[name] = function () {
        let obj = this._wraped
        let isChain = !!this._chain
        let ret = method.apply(obj, arguments)
        if (isChain) {
          return chainResult(this, obj)
        } else {
          return ret
        }
      }
    }
  )
}

// eslint-disable-next-line import/no-default-export
export default { init }
