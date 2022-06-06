// promise工具函数的测试用例
// import { fin } from '../dist/fin.es.js'
let { fin } = require('../dist/fin.common.js')
let promiseTo
describe('测试promise相关的工具函数', () => {
  beforeAll(() => {
    promiseTo = fin.promiseTo
  })
  test('Promis被解决了', async () => {
    let input = 88
    let promise = Promise.resolve(input)
    let [err, data] = await promiseTo(promise)
    expect(data).toEqual(88)
    expect(err).toBeNull()
  })
  test('Promis被拒绝了', async () => {
    let promise = Promise.reject('Error')
    let [err, data] = await promiseTo(promise)
    expect(err).toEqual('Error')
    expect(data).toBeUndefined()
  })
})
