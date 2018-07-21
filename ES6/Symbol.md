# Symbol

## 概述

> ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值 -- 原始类型的值
> 它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）

```js
// Symbol函数前不能使用new命令，否则会报错
let s = Symbol();

typeof s
// "symbol"
```

> Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let sy1 = Symbol('x')
let sy2 = Symbol('y')
sy1 // Symbol(foo)
sy2 // Symbol(bar)

sy1.toString() // "Symbol(x)"
sy2.toString() // "Symbol(y)"
```

```js
const obj = {
  a: 'lwy'
}
let sy3 = Symbol(obj)
// Symbol([object Object])

sy3.toString()
//"Symbol([object Object])"
const obj1 = {
  toString(){
    return 'abs'
  }
}

let sy4 = Symbol(obj1)
// Symbol(abs)
sy4.toString()
// 'Symbol(abs)'
```

> Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
> Symbol 值不能与其他类型的值进行运算，会报错。
> 但是，Symbol 值可以显式转为字符串。
> 另外，Symbol 值也可以转为布尔值，但是不能转为数值。

## 作为属性名的Symbol

> Symbol 值作为对象属性名时，不能用点运算符

```js
let mySym = Symbol()
// 第一种写法
let a = {};
a[mySym] = "hello Symbol"
// 第二种写法
let b = {
  [mySym]: 'hello Symbol'
};

// 第三种写法
let c = {};
Object.defineProperty(c, mySym, { value: 'Hello!' });

// ps因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值

const mySy = Symbol();
const d = {}
d.mySy = 'hello';
d[mySy]
// undefined
d['mySy']
// 'hello'

```

## 消除魔术字符串

> 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替

## 属性名的遍历

> Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
> Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```js
const obj = {}
let sy1 = Symbol('sy1')
let sy2 = Symbol('sy2')

obj[sy1] = 'hello'
obj[sy2] = 'Symbol'
obj.a = '!'

for( let item in obj){
  console.log(item)
}

// for( let item of obj){
//   console.log(item)
// }

//obj is not iterable

console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(JSON.stringify(obj))

const objectSymbols = Object.getOwnPropertySymbols(obj);
// [Symbol(sy1), Symbol(sy2)]
```