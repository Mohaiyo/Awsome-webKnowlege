import bar from './bar.js'

const filterArr = bar([1, undefined, null, 0, 'string', { name: '12131', age: '20'}])
console.log('filter arr', filterArr)