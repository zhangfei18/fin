/*!
 * fin函数库 v1.0.0
 * (c) 2022-2022 zhangfei@baidu.com
 */
function timeDown() {
}
// eslint-disable-next-line import/no-default-export
var time = { timeDown };

// 工具函数
let class2type = {};
'Number String Boolean Array Object Date RegExp Error Function Null Undefined'
  .split(' ')
  .forEach(type => {
    class2type[`[object ${type}]`] = type.toLowerCase();
  });
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
};
/**
 *
 * @param {*} source
 * @param {*} target
 * 混入
 */
let mixin = function (source, target) {
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      let fn = source[key];
      if (type(fn) === 'function') {
        target[key] = function wraped() {
          let args = [this.wraped, ...arguments];
          fn.apply(source, args);
        };
      } else {
        target[key] = fn;
      }
    }
  }
};

// 定义最后导出的对象fin
let fin = function (obj) {
  if (!(this instanceof fin)) {
    return new fin(obj)
  }
  this.wraped = obj;
}

// 将各个函数模块全部挂载到fin函数上
;[time].forEach(functionModule => {
  for (const fnName in functionModule) {
    if (Object.hasOwnProperty.call(functionModule, fnName)) {
      fin[fnName] = functionModule[fnName];
    }
  }
});

// 将fin函数对象上的属性全部mixin到fin的prototype上
mixin(fin, fin.prototype);

export { fin as default };
