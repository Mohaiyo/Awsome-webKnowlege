import bar from './bar'
import foo from './foo'


const filterArr = bar([1, undefined, null, 0, 123, 'string', { name: 'wayne', age: '18'}])
console.log('filter arr', filterArr)

const ids = foo([{ id: 1, name: 'li'}, { id: 2, name: 'liang' }, { id: 3, name: 'xie' }])
console.log('post ids' , ids)