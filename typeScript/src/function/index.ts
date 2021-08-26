// 函数声明

function sum(a: number, b: number): number {
  return a + b
}

sum(1, 2)

// sum(1)

// 函数表达式 typscript中 => 表示函数的定义 左边是输入类型 右边是输出类型

let mySumFn: (a: number, b: number) => number = function (a: number, b: number): number {
  return a + b
}

// 用interface表述

interface searchFunc {
  (source: string, subString: string): boolean
}

let mySearch: searchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1
}

// 可选参数

function sayName(firstName: string, lastName?: string) {
  console.log('firstName', firstName)
  console.log('lastName', lastName)
  if (lastName) {
    return firstName + ' ' + lastName
  }
  return firstName
}

let wayneLiang = sayName('wayne', 'liang')
let wayne = sayName('wayne')

// 默认参数

function buildName(firstName: string, lastName: string = 'liang'): string {
  return firstName + ' ' + lastName
}

let wayneName = buildName('wayne', 'cai')
console.log('wayneName', wayneName)

// 剩余参数

function restFn(array: any[], ...items: any[]): void {
  items.forEach(item => {
    array.push(item)
  })
}
let a = []

restFn(a, 1, 2, 3)

// 函数重载
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}


console.log(reverse('123456'))

console.log(reverse(123456))

console.log(reverse(1234444))
