// for in
const shallCopy = function(obj) {
  let rst = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      rst[key] = obj[key]
    }
  }
  return rst
}

let wayne = {
  age: 18,
  name: {
    firstName: 'wayne',
    lastName: 'liang'
  }
}
const wayneCopy = shallCopy(wayne)
wayneCopy.age = 19
wayneCopy.name.lastName = 'liang liang'

console.log('wayne', wayne)
console.log('wayneCopy', wayneCopy)

// Object.assign
const copyByAssign = Object.assign({}, wayne)

copyByAssign.age = 20
copyByAssign.name.firstName = 'tiny wayne'

console.log('wayne', wayne)
console.log('copyByAssign', copyByAssign)

// ...rest

// slice 适用于数组
let a=[1,2,3,4]
 let b=a.slice()
 b[0]=9
 console.log(a) //[1,2,3,4]
 console.log(b)