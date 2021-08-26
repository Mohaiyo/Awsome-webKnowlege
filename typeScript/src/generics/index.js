// function createArray(length: number, value: any): Array<any> {
//   let result = []
//   for (let index = 0; index < length; index++) {
//     result.push(value)
//   }
//   return result
// }
// createArray(3, 'y')
// 泛型定义
function createArray(length, value) {
    var result = [];
    for (var index = 0; index < length; index++) {
        result.push(value);
    }
    return result;
}
createArray(3, 'y');
// 多个类型参数
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([1, 'skksks']);
function contract(arg) {
    console.log(arg.length);
    return arg;
}


var myName = 'hello'