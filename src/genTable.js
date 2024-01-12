import { table } from './engine.js'
import data from './tabledata.js'

const arr = data
const result = table(arr)

console.log('html:\n', result[0])
console.log('js:\n', result[1])