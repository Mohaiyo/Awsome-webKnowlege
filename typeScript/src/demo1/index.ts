/*
 * @Author: mohaiyo 
 * @gitHub: 'https://github.com/Mohaiyo' 
 * @Date: 2019-07-16 16:05:21 
 * 基础类型
 * @Last Modified by: mohaiyo
 * @Last Modified time: 2021-08-26 11:56:32
 */

// boolean
let isFinish: boolean = false

isFinish = true

// let createdByNewBoolean: boolean = new Boolean();

let createByBoolean: boolean = Boolean(1)

// number
let decLiteral: number = 5
let hexLiteral: number = 0xf00d

let notaNumber: number = NaN

let InfinitNumber: number = Infinity


// void 空值

// void值表示没有任何返回值的函数
function sayHello(name: string): void {
  console.log(name)
}

function hello(params: number): string {
  return params.toString()
}

hello(1)

// 类型推断
let myname = 'wayne'
// myname = 1

let somethingUndefined: undefined = undefined

let numberType: number = 1
// numberType = somethingUndefined

sayHello(myname)

//null & undefind

let u: undefined
let n: null

let num: number = u
let nnum: number = null

let v: void

// let vData: number = v