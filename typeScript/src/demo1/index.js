/*
 * @Author: mohaiyo
 * @gitHub: 'https://github.com/Mohaiyo'
 * @Date: 2019-07-16 16:05:21
 * 基础类型
 * @Last Modified by: mohaiyo
 * @Last Modified time: 2021-08-26 11:56:32
 */
// boolean
var isFinish = false;
isFinish = true;
// let createdByNewBoolean: boolean = new Boolean();
var createByBoolean = Boolean(1);
// number
var decLiteral = 5;
var hexLiteral = 0xf00d;
var notaNumber = NaN;
var InfinitNumber = Infinity;
// void 空值
// void值表示没有任何返回值的函数
function sayHello(name) {
    console.log(name);
}
function hello(params) {
    return params.toString();
}
hello(1);
// 类型推断
var myname = 'wayne';
// myname = 1
var somethingUndefined = undefined;
var numberType = 1;
// numberType = somethingUndefined
sayHello(myname);
//null & undefind
var u;
var n;
var num = u;
var nnum = null;
var v;
// let vData: number = v
