/*!
 * fin函数库 v1.0.0
 * (c) 2022-2022 zhangfei@baidu.com
 */
function timeDown() {
}
// eslint-disable-next-line import/no-default-export
var time = { timeDown };

// 工具函数
let _fin$1;
let class2type = {};
'Number String Boolean Array Object Date RegExp Error Function Null Undefined'
  .split(' ')
  .forEach(type => {
    class2type[`[object ${type}]`] = type.toLowerCase();
  });

let init$1 = function (_Fin) {
  _fin$1 = _Fin;

  // 挂载链式处理函数
  _fin$1.chain = _chain;

  // 挂载value函数
  _fin$1.prototype['value'] = function () {
    return this._wraped
  };
};
/**
 * 处理链式调用函数返回的结果
 * @param {*} ins: fin的示例
 * @param {*} obj: 要处理的数据经过上一个函数处理后的结果
 */
function chainResult(ins, obj) {
  // 如果ins上没有_chain属性，表示这个数据不需要采用链式调用，当然其经过函数处理后返回的结果obj也就不要支持链式调用了，所以直接
  // 返回obj即可
  if (ins._chain) {
    return _fin$1.chain(obj)
  } else {
    return obj
  }
}
function _chain(obj) {
  let instance = obj instanceof _fin$1 ? obj : _fin$1(obj);
  instance._chain = true;
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
          let args = [this._wraped, ...arguments];
          return chainResult(this, fn.apply(source, args))
        };
      } else {
        target[key] = fn;
      }
    }
  }
};

let _fin;
let ArrayProto = Array.prototype;

function init(_Fin) {
  _fin = _Fin
  ;['pop', 'push', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(
    name => {
      // 保存原始的方法
      let method = ArrayProto[name];
      _fin.prototype[name] = function () {
        let obj = this._wraped;
        let isChain = !!this._chain;
        let ret = method.apply(obj, arguments);
        if (isChain) {
          return chainResult(this, obj)
        } else {
          return ret
        }
      };
    }
  );
}

// eslint-disable-next-line import/no-default-export
var array = { init };

// 异步相关的工具函数
function promiseTo(promise) {
  return promise.then(ret => [null, ret]).catch(err => [err, undefined])
}

// eslint-disable-next-line import/no-default-export
var promise = { promiseTo };

function classNames() {
  let retClasses = [];
  for (let index = 0; index < arguments.length; index++) {
    const arg = arguments[index];
    if (!arg) {
      continue
    }
    let t = type(arg);
    if (t === 'string' || t === 'number') {
      retClasses.push(arg);
    } else if (t === 'array') {
      let i = classNames.apply(null, arg);
      if (i) {
        retClasses.push(i);
      }
    } else if (t === 'object') {
      for (let key in arg) {
        if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
          retClasses.push(key);
        }
      }
    }
  }
  return retClasses.join(' ')
}
// eslint-disable-next-line import/no-default-export
var classNames$1 = { classNames };

// 定义最后导出的对象fin
let fin = function (obj) {
  if (!(this instanceof fin)) {
    return new fin(obj)
  }
  this._wraped = obj;
};

// 主要任务是将fin构造函数加载到utils模块文件的作用域中
init$1(fin)

// 将各个函数模块全部挂载到fin函数上
;[time, array, promise, classNames$1].forEach(functionModule => {
  for (const fnName in functionModule) {
    if (Object.hasOwnProperty.call(functionModule, fnName)) {
      if (fnName === 'init') {
        functionModule[fnName](fin);
      } else {
        fin[fnName] = functionModule[fnName];
      }
    }
  }
});

// 将fin函数对象上的属性全部mixin到fin的prototype上
mixin(fin, fin.prototype);

export { fin };
