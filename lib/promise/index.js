// 异步相关的工具函数
function promiseTo(promise) {
  return promise.then(ret => [null, ret]).catch(err => [err, undefined])
}

// eslint-disable-next-line import/no-default-export
export default { promiseTo }
