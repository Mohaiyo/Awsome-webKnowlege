// function createArray(length: number, value: any): Array<any> {
//   let result = []
//   for (let index = 0; index < length; index++) {
//     result.push(value)
//   }
//   return result
// }

// createArray(3, 'y')


// 泛型定义
function createArrayFn<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let index = 0; index < length; index++) {
    result.push(value)
  }
  return result
}

createArrayFn<string>(3, 'y')

// 多个类型参数

function swapT<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swapT([1, 'skksks'])

// 泛型约束
interface lengthwish {
  length: number
}

function contractN<T extends lengthwish>(arg: T): T {
  console.log(arg.length)
  return arg
}

contractN(['1', 2, 4, 5])
contractN({ length: 1, value: 2 })

// 泛型接口

interface createArrayFunc {
  <T>(length: number, value: T): Array<T>
}

let createArray2: createArrayFunc;

createArray2 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let index = 0; index < length; index++) {
    result.push(value)
  }
  return result
}

interface CreateArrayFunc3<T> {
  (length: number, value: T): Array<T>;
}

let createArray3: CreateArrayFunc3<any>;
createArray3 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArrayFn(3, 'x'); // ['x', 'x', 'x']
createArray2(5, 'y'); // ['y', 'y', 'y', 'y', 'y']
createArray3(3, 'z'); // ['z', 'z', 'z']

// 泛型类

class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let numG = new GenericNumber<number>()
numG.zeroValue = 1
numG.add = function (x, y) { return x + y }

let str = new GenericNumber<string>()

str.zeroValue = ''

str.add('', 'test')

// 在通用约束中使用类型参数

function getProperty<T, Key extends keyof T>(obj: T, key: Key) {
  return obj[key]
}

let obj = { a: 1, b: 'two', c: '三' }
getProperty(obj, 'a')
getProperty(obj, 'm')