import { type } from '../utils/index.js'

function classNames() {
  let retClasses = []
  for (let index = 0; index < arguments.length; index++) {
    const arg = arguments[index]
    if (!arg) {
      continue
    }
    let t = type(arg)
    if (t === 'string' || t === 'number') {
      retClasses.push(arg)
    } else if (t === 'array') {
      let i = classNames.apply(null, arg)
      if (i) {
        retClasses.push(i)
      }
    } else if (t === 'object') {
      for (let key in arg) {
        if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
          retClasses.push(key)
        }
      }
    }
  }
  return retClasses.join(' ')
}
// eslint-disable-next-line import/no-default-export
export default { classNames }
