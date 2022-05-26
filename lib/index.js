import time from './time/index.js'
import { mixin } from './utils/index'
// 定义最后导出的对象fin
let fin = function (obj) {
  if (!(this instanceof fin)) {
    return new fin(obj)
  }
  this.wraped = obj
}

// 将各个函数模块全部挂载到fin函数上
;[time].forEach(functionModule => {
  for (const fnName in functionModule) {
    if (Object.hasOwnProperty.call(functionModule, fnName)) {
      fin[fnName] = functionModule[fnName]
    }
  }
})

// 将fin函数对象上的属性全部mixin到fin的prototype上
mixin(fin, fin.prototype)
let a = 'zf'
console.log('我是最外层的log')
// eslint-disable-next-line import/no-default-export
export default fin
