import { fin } from "../dist/fin.es";
let classNames = fin.classNames
describe('fin.classNames的测试用例', () => {
    test('普通值', () => {
        let ret = classNames('0', 1, null, undefined, 'boy')
        expect(ret).toEqual('0 1 boy')
    })
    test('数组', () => {
        let ret = classNames([1,2,3], [4,5,6])
        expect(ret).toEqual('1 2 3 4 5 6')
    })
    test('嵌套数组', () => {
        let ret = classNames([1, 2, 3, [4, 5, 6]], [7, 8, 9])
        expect(ret).toEqual('1 2 3 4 5 6 7 8 9')
    })
    test('空对象', () => {
        let ret = classNames({})
        expect(ret).toEqual('')
    })
    test('对象-value都是假值', () => {
        let ret = classNames({
            a: '',
            b: false,
            c: 0,
            d: null,
            e: undefined
        })
        expect(ret).toEqual('')
    })
    test('对象-value都是真值', () => {
        let ret = classNames({
            a: 1,
            b: '0',
            c: true,
            d: {},
            e: function(){}
        })
        expect(ret).toEqual('a b c d e')
    })
})