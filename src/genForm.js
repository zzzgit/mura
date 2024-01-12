import { form } from './engine.js'
import data from './formdata.js'

const arr = data
const result = form(arr)
console.log('html:\n', result[0])
console.log('js:\n', result[1])
