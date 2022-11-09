import { isNumber } from './validate.js'

export function validateIsNumber (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else if (isNumber(value)) {
    callback(new Error('请输入数字！'))
  } else {
    callback()
  }
}
