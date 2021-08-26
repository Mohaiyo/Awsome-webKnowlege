// 「类型 + 方括号」表示法

let fibonacci: number[] = [1, 1, 2, 3, 5, 8, 13]

// fibonacci.push('12')

// 数组泛型

let fibonacci2: Array<number> = [1, 1, 2, 3, 5, 8]

// 接口的方式 很少用
interface NumberArray {
  [index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];


// function sum() {
//   let arg:number[] = arguments;
// }

function sumFn() {
  let arg: IArguments = arguments
}

let list: any[] = [{ name: 'wanye', age: 10 }, { website: 'https://www.wayne.liang.com' }]

