/*
 * @Author: mohaiyo 
 * @gitHub: 'https://github.com/Mohaiyo' 
 * @Date: 2019-07-16 16:05:21 
 * 基础类型
 * @Last Modified by: mohaiyo
 * @Last Modified time: 2019-07-16 16:39:40
 */

// boolean
let isFinish: boolean = false

isFinish = true

// let createdByNewBoolean: boolean = new Boolean();

// number
let decLiteral: number = 5
let hexLiteral: number = 0xf00d

let notaNumber = NaN

let InfinitNumber = Infinity


// void 空值

function sayHello(name: string) :void{
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

