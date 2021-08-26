// 1. JSON.parse(JSON.stringify())

const student_a = {
  name: 'wayne liang',
  score: [
    {
      label: "math",
      value: 199
    },
    {
      label: 'chinese',
      value: 88
    },
    {
      label: 'english',
      value: 148
    }
  ]
}

const student_b = JSON.parse(JSON.stringify(student_a))

student_b.score = [{
  label: "math",
  value: 144
},
{
  label: 'chinese',
  value: 132
},
{
  label: 'english',
  value: 122
}]

console.log(student_a)
console.log(student_b)

// 不适用的情况 symbol function undefined null NaN

let symbolTar = Symbol('tar')
const obj_a = {
  name: 'wayne',
  email: 'email@163j.com',
  foo: function() {
    console.log(arguments.length)
  },
  bar: undefined,
  [symbolTar]: 2,
  logo: null,
  score: NaN
}
const obj_b = JSON.parse(JSON.stringify(obj_a))

console.log('obj_a', obj_a)
console.log('obj_b', obj_b)

// 自己实现deepClone

const deepClone = function(object) {
  let deepCloneObj = Array.isArray(object) ? [] : {}
  if (object && typeof object === 'object') {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        deepCloneObj[key] = object[key]
        if (object[key] && typeof object[key] === 'object') { // 还是引用类型 递归拷贝
          deepCloneObj[key] = deepClone(object[key])
        } else {
          deepCloneObj[key] =  object[key]
        }
      }
    }
  }
  return deepCloneObj
}
