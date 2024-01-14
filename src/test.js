import { form } from './engine.js'
import parseFormStr from './parseFormStr.js'

const data = '    掃射.w:data   部門.s'

const formResult = form(parseFormStr(data), 'foo', true)
console.log('html:\n', formResult[0])
console.log('js:\n', formResult[1])