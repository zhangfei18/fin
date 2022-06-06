import time from './time/index.js'
import array from './array/index.js'
import promise from './promise/index.js'
import classNames from './classNames/index.js'
import { mixin, init as utilsInit } from './utils/index'

// 定义最后导出的对象fin
let fin = function (obj) {
  if (!(this instanceof fin)) {
    return new fin(obj)
  }
  this._wraped = obj
}

// 主要任务是将fin构造函数加载到utils模块文件的作用域中
utilsInit(fin)

// 将各个函数模块全部挂载到fin函数上
;[time, array, promise, classNames].forEach(functionModule => {
  for (const fnName in functionModule) {
    if (Object.hasOwnProperty.call(functionModule, fnName)) {
      if (fnName === 'init') {
        functionModule[fnName](fin)
      } else {
        fin[fnName] = functionModule[fnName]
      }
    }
  }
})
let a = 1
let b = 2
// let c = 3
// let d = 4
// 将fin函数对象上的属性全部mixin到fin的prototype上
mixin(fin, fin.prototype)

export { fin }
