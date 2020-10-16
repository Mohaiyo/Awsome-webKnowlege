import bar from './bar.js'
import txt from '../files/file.txt'

const filterArr = bar([1, undefined, null, 0, 123, 'string', { name: 'wayne', age: '18'}])
console.log('filter arr', filterArr)
console.log('txt', txt)